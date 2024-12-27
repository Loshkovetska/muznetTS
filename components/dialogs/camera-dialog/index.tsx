import CommonDialogWrapper from "@/components/common-dialog-wrapper";
import CameraActionButton from "@/components/dialogs/camera-dialog/camera-action-button";
import CameraBlock from "@/components/dialogs/camera-dialog/camera-block";
import CameraDialogButtons from "@/components/dialogs/camera-dialog/camera-dialog-buttons";
import CameraFunc from "@/components/dialogs/camera-dialog/camera-func";
import CameraModeBlock from "@/components/dialogs/camera-dialog/camera-mode-block";
import useCamera from "@/lib/hooks/camera.hook";
import { RefreshCcw, RefreshCw, Zap, ZapOff } from "@tamagui/lucide-icons";
import { useMemo } from "react";

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
    facing,
    flash,
    mode,
    cameraRef,
    isRecording,
    preview,
    setMode,
    setFacing,
    setFlash,
    onCameraPress,
    retake,
  } = useCamera();

  const FlashIcon = useMemo(() => (flash === "on" ? Zap : ZapOff), [flash]);
  const FacingIcon = useMemo(
    () => (facing === "back" ? RefreshCw : RefreshCcw),
    [facing]
  );

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
        onPress={() => setFlash((prev) => (prev === "off" ? "on" : "off"))}
      />
      <CameraBlock
        cameraRef={cameraRef}
        facing={facing}
        flash={flash}
        mode={mode}
        preview={preview}
      />
      <CameraDialogButtons
        retake={retake}
        onAccept={() => onSendMessage([preview])}
        text={mode === "picture" ? "Photo" : "Video"}
      />
      <CameraFunc
        visible={!preview}
        FacingIcon={FacingIcon}
        onOpenChange={onOpenChange}
        onFacing={() =>
          setFacing((prev) => (prev === "back" ? "front" : "back"))
        }
      >
        <CameraModeBlock
          mode={mode}
          isRecording={isRecording}
          onPress={onCameraPress}
          onMode={setMode}
        />
      </CameraFunc>
    </CommonDialogWrapper>
  );
}
