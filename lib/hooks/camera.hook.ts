import {
  CameraCapturedPicture,
  CameraMode,
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PreviewType =
  | CameraCapturedPicture
  | {
      uri: string;
    };

type CameraStateType = {
  facing: CameraType;
  flash: FlashMode;
  mode: CameraMode;
  preview: PreviewType | null;
  isRecording: boolean;
};

const DEFAULT_STATE = {
  facing: "back",
  flash: "off",
  preview: null,
  mode: "picture",
  isRecording: false,
};

export function useCamera() {
  const cameraRef = useRef<CameraView>(null);

  const [cameraState, setState] = useState<CameraStateType>(
    DEFAULT_STATE as CameraStateType
  );
  const [timer, setTimer] = useState(0);

  const timerInterval = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const toggleState = useCallback((obj: Partial<CameraStateType>) => {
    setState((prev) => ({ ...prev, ...obj }));
  }, []);

  const takePicture = useCallback(async () => {
    cameraRef.current
      ?.takePictureAsync()
      .then((res) => res && toggleState({ preview: res }));
  }, [toggleState]);

  const recordVideo = useCallback(() => {
    cameraRef.current?.recordAsync({ maxDuration: 120 }).then((res) => {
      if (res) {
        toggleState({ preview: res, isRecording: false });
      }
    });

    toggleState({ isRecording: true });
  }, [toggleState]);

  const stopRecord = useCallback(() => {
    cameraRef.current?.stopRecording();
    toggleState({ isRecording: false });
  }, [toggleState]);

  const onCameraPress = useCallback(() => {
    if (permission?.granted) {
      if (cameraState.mode === "picture") {
        return takePicture();
      }
      cameraState.isRecording ? stopRecord() : recordVideo();
      return;
    }

    requestPermission();
  }, [
    permission,
    cameraState.isRecording,
    cameraState.mode,
    takePicture,
    stopRecord,
    recordVideo,
  ]);

  const retake = useCallback(() => {
    toggleState({ preview: null, isRecording: false });
    setTimer(0);
  }, [onCameraPress]);

  const time = useMemo(() => {
    if (!timer) return "00:00:00";
    let seconds = Math.floor(timer / 1000),
      minutes = Math.floor((timer / 1000 / 60) % 60);

    if (minutes > 0) {
      seconds = seconds - minutes * 60;
    }

    return `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }, [timer]);

  const resetParams = useCallback(() => {
    setState(DEFAULT_STATE as CameraStateType);
    setTimer(0);
    clearInterval(timerInterval.current);
    stopRecord();
  }, [stopRecord]);

  useEffect(() => {
    if (cameraState.isRecording) {
      timerInterval.current = setInterval(() => {
        setTimer((prev) => prev + 1000);
      }, 1000);
    }
    if (!cameraState.isRecording) {
      clearInterval(timerInterval.current);
    }

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [cameraState.isRecording]);

  return {
    cameraRef,
    time,
    cameraState,
    retake,
    onCameraPress,
    toggleState,
    resetParams,
  };
}
