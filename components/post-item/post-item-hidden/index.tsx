import { Text } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { CircleCheck, X } from "@tamagui/lucide-icons";
import { YStack } from "tamagui";

type PostItemHiddenPropType = {
  onUnHide: () => void;
  onReport: () => void;
  onRemove: () => void;
};

export default function PostItemHidden({
  onUnHide,
  onReport,
  onRemove,
}: PostItemHiddenPropType) {
  return (
    <YStack
      gap={8}
      alignItems="center"
      paddingHorizontal={16}
      paddingVertical={24}
      borderTopWidth={1}
      borderBottomWidth={1}
      borderColor={colors["light-gray"]}
    >
      <X
        position="absolute"
        top={8}
        right={8}
        color={colors["gray-100"]}
        onPress={onRemove}
      />
      <CircleCheck
        color={colors["main"]}
        fill={colors["success"]}
        size={32}
      />
      <Text
        typo="reg-16"
        color="gray-100"
        textAlign="center"
        marginBottom={8}
      >
        This post has been hidden. You’ll see posts like this lower in your feed
      </Text>
      <YStack
        gap={16}
        alignItems="center"
      >
        <Text
          typo="bold-14"
          color="error"
          onPress={onReport}
        >
          Report this post
        </Text>

        <Text
          typo="bold-14"
          color="black"
          onPress={onUnHide}
        >
          Undo
        </Text>
      </YStack>
    </YStack>
  );
}
