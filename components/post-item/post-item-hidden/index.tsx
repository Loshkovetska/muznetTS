import { colors, typography } from "@/tamagui.config";
import { CircleCheck, X } from "@tamagui/lucide-icons";
import { Text, YStack } from "tamagui";

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
        color="#5C6574"
        onPress={onRemove}
      />
      <CircleCheck
        color={colors["white"]}
        fill={colors["success"]}
        size={32}
      />
      <Text
        {...typography["paragraph-16"]}
        color="#5C6574"
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
          {...typography["heading-14"]}
          color={colors["error"]}
          onPress={onReport}
        >
          Report this post
        </Text>

        <Text
          {...typography["heading-14"]}
          color={colors["black"]}
          onPress={onUnHide}
        >
          Undo
        </Text>
      </YStack>
    </YStack>
  );
}
