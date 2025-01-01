import { MobileSheet } from "@/components/ui/mobile-sheet";
import Separator from "@/components/ui/separator";
import { colors, typography } from "@/tamagui.config";
import { Text, YStack } from "tamagui";

type PostMoreDialogPropType = {
  open: boolean;
  canShare: boolean;
  ownerPost: boolean;
  onOpenChange: () => void;
  onShare: () => void;
};

export default function PostMoreDialog({
  open,
  canShare,
  ownerPost,
  onShare,
  onOpenChange,
}: PostMoreDialogPropType) {
  return (
    <MobileSheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <YStack
        backgroundColor={colors["white-smoke"]}
        borderRadius={8}
        borderWidth={1}
        borderColor={colors["gainsboro"]}
        paddingVertical={16}
        gap={16}
      >
        {!ownerPost && (
          <>
            <Text
              {...typography["bold-16"]}
              textAlign="center"
            >
              Send Direct Message
            </Text>
          </>
        )}
        {!ownerPost && canShare && <Separator />}
        {canShare && (
          <>
            <Text
              {...typography["bold-16"]}
              textAlign="center"
              onPress={onShare}
            >
              More
            </Text>
          </>
        )}
      </YStack>
    </MobileSheet>
  );
}
