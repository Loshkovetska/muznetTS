import UploadButton from "@/components/dialogs/upload-dialog/upload-button";
import { colors } from "@/tamagui.config";
import { AlertTriangle, EyeOff, Send } from "@tamagui/lucide-icons";
import { XStack } from "tamagui";

type CommonActionsPropType = {
  onReport: () => void;
  onHide: () => void;
  onShare: () => void;
};

export default function CommonActions({
  onHide,
  onReport,
  onShare,
}: CommonActionsPropType) {
  return (
    <XStack
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      paddingBottom={24}
    >
      <UploadButton
        icon={<AlertTriangle color={colors["error"]} />}
        labelColor={colors["error"]}
        label="Report"
        onPress={onReport}
      />
      <UploadButton
        icon={<EyeOff />}
        label="Hide"
        onPress={onHide}
      />
      <UploadButton
        icon={<Send />}
        label="Share"
        onPress={onShare}
      />
    </XStack>
  );
}
