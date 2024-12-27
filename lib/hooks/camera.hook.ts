import {
  CameraCapturedPicture,
  CameraMode,
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { useCallback, useRef, useState } from "react";

export default function useCamera() {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [mode, setMode] = useState<CameraMode>("picture");
  const [preview, setPreview] = useState<
    | CameraCapturedPicture
    | {
        uri: string;
      }
    | null
  >(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setRecording] = useState(false);

  const takePicture = useCallback(async () => {
    cameraRef.current?.takePictureAsync().then((res) => res && setPreview(res));
  }, []);

  const recordVideo = useCallback(() => {
    cameraRef.current?.recordAsync().then((res) => res && setPreview(res));
    setRecording(true);
  }, []);

  const stopRecord = useCallback(() => {
    cameraRef.current?.stopRecording();
    setRecording(false);
  }, []);

  const onCameraPress = useCallback(() => {
    if (permission?.granted) {
      if (mode === "picture") {
        return takePicture();
      }
      isRecording ? stopRecord() : recordVideo();
      return;
    }

    requestPermission();
  }, [mode, isRecording, takePicture, stopRecord, recordVideo]);

  const retake = useCallback(() => {
    setPreview(null);
    setRecording(false);
  }, [onCameraPress]);

  console.log(mode, isRecording, preview);
  return {
    facing,
    flash,
    mode,
    cameraRef,
    isRecording,
    preview,
    retake,
    setMode,
    setFlash,
    setFacing,
    onCameraPress,
  };
}
