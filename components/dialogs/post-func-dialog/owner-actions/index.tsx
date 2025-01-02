import { Separator } from "@/components/ui";
import { Text } from "@/components/ui";
import { PostType } from "@/lib/types/post";
import { colors } from "@/tamagui.config";
import { YStack } from "tamagui";

export default function OwnerActions(
  post: PostType & {
    onDelete: () => void;
    onEdit: () => void;
    onToggle: (name: string, value: boolean) => void;
    onShare: () => void;
  }
) {
  return (
    <YStack
      backgroundColor={colors["white-smoke"]}
      borderRadius={8}
      borderWidth={1}
      borderColor={colors["gainsboro"]}
      paddingVertical={16}
      gap={16}
    >
      <Text
        typo="bold-16"
        textAlign="center"
        onPress={post.onShare}
      >
        Share
      </Text>
      <Separator />
      <Text
        typo="bold-16"
        textAlign="center"
        onPress={post.onEdit}
      >
        Edit
      </Text>
      <Separator />
      <Text
        typo="bold-16"
        textAlign="center"
        onPress={() => post.onToggle("comment_on", !post.comment_on)}
      >
        Turn {post.comment_on ? "off" : "on"} commenting
      </Text>
      <Separator />
      <Text
        typo="bold-16"
        textAlign="center"
        onPress={() => post.onToggle("share_on", !post.share_on)}
      >
        Turn {post.share_on ? "off" : "on"} sharing
      </Text>
      <Separator />
      <Text
        typo="bold-16"
        textAlign="center"
        color="error"
        onPress={post.onDelete}
      >
        Delete
      </Text>
    </YStack>
  );
}
