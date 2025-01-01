import UploadButton from "@/components/dialogs/upload-dialog/upload-button";
import { MobileSheet } from "@/components/ui/mobile-sheet";
import useDocument from "@/lib/hooks/document.hook";
import useImagePicker from "@/lib/hooks/image-picker.hook";
import { BaseDialogPropType } from "@/lib/types";
import { Camera, Cloud, Image } from "@tamagui/lucide-icons";
import { XStack } from "tamagui";

type UploadDialogPropType = {
  onCameraOpen: () => void;
  sendMessage: (files: any[]) => void;
} & BaseDialogPropType;

export default function UploadDialog({
  open,
  onOpenChange,
  sendMessage,
  onCameraOpen,
}: UploadDialogPropType) {
  const { getDocument } = useDocument((files) => sendMessage(files));
  const { pickImage } = useImagePicker((file) => sendMessage([file]));
  return (
    <MobileSheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <XStack
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        paddingBottom={24}
      >
        <UploadButton
          icon={<Camera />}
          label="Camera"
          onPress={onCameraOpen}
        />
        <UploadButton
          icon={<Image />}
          label="Gallery"
          onPress={pickImage}
        />
        <UploadButton
          icon={<Cloud />}
          label="Files"
          onPress={() => getDocument()}
        />
      </XStack>
    </MobileSheet>
  );
}
