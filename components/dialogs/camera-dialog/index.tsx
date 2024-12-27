import CommonDialogWrapper from "@/components/common-dialog-wrapper";
import CameraActionButton from "@/components/dialogs/camera-dialog/camera-action-button";
import CameraBlock from "@/components/dialogs/camera-dialog/camera-block";
import CameraDialogButtons from "@/components/dialogs/camera-dialog/camera-dialog-buttons";
import CameraFunc from "@/components/dialogs/camera-dialog/camera-func";
import CameraModeBlock from "@/components/dialogs/camera-dialog/camera-mode-block";
import useCamera from "@/lib/hooks/camera.hook";
import { RefreshCcw, RefreshCw, Zap, ZapOff } from "@tamagui/lucide-icons";
import { useCallback, useMemo } from "react";

type CameraDialogPropType = {
  open: boolean;
  onOpenChange: () => void;
  onSendMessage: (file: any[]) => void;
};

export default function CameraDialog({
  open,
  onOpenChange,
  onSendMessage,
}: CameraDialogPropType) {
  const {
    cameraState,
    cameraRef,
    time,
    toggleState,
    onCameraPress,
    retake,
    resetParams,
  } = useCamera();

  const FlashIcon = useMemo(
    () => (cameraState.flash === "on" ? Zap : ZapOff),
    [cameraState.flash]
  );
  const FacingIcon = useMemo(
    () => (cameraState.facing === "back" ? RefreshCw : RefreshCcw),
    [cameraState.facing]
  );

  const onClose = useCallback(() => {
    resetParams();
    onOpenChange();
  }, [resetParams, onOpenChange]);

  return (
    <CommonDialogWrapper
      open={open}
      light={false}
      paddingTop={48}
      gap={32}
      zIndex={200_000}
    >
      <CameraActionButton
        Icon={FlashIcon}
        onPress={() =>
          toggleState({ flash: cameraState.flash === "off" ? "on" : "off" })
        }
      />
      <CameraBlock
        cameraRef={cameraRef}
        {...cameraState}
        time={cameraState.mode === "video" ? time : undefined}
      />
      {cameraState.preview && (
        <CameraDialogButtons
          retake={retake}
          onAccept={() => onSendMessage([cameraState.preview])}
          text={cameraState.mode === "picture" ? "Photo" : "Video"}
        />
      )}
      <CameraFunc
        key={open ? 1 : 0}
        visible={!cameraState.preview}
        FacingIcon={FacingIcon}
        onOpenChange={onClose}
        onFacing={() =>
          toggleState({
            facing: cameraState.facing === "back" ? "front" : "back",
          })
        }
      >
        <CameraModeBlock
          mode={cameraState.mode}
          isRecording={cameraState.isRecording}
          onPress={onCameraPress}
          onMode={(mode) => toggleState({ mode })}
        />
      </CameraFunc>
    </CommonDialogWrapper>
  );
}