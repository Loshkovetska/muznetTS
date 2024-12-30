import { MobileSheet } from "@/components/ui/mobile-sheet";
import Separator from "@/components/ui/separator";
import { typography } from "@/tamagui.config";
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
        backgroundColor="#F5F5F5"
        borderRadius={8}
        borderWidth={1}
        borderColor="#E0E0E0"
        paddingVertical={16}
        gap={16}
      >
        {!ownerPost && (
          <>
            <Text
              {...typography["heading-16"]}
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
              {...typography["heading-16"]}
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
