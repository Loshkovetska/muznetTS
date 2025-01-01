import { MobileSheet } from "@/components/ui/mobile-sheet";
import Separator from "@/components/ui/separator";
import Text from "@/components/ui/text";
import { BaseDialogPropType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { YStack } from "tamagui";

type PostMoreDialogPropType = {
  canShare: boolean;
  ownerPost: boolean;
  onShare: () => void;
} & BaseDialogPropType;

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
              typo="bold-16"
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
              typo="bold-16"
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
