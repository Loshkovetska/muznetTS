import Separator from "@/components/ui/separator";
import { PostType } from "@/lib/types/post";
import { colors, typography } from "@/tamagui.config";
import { Text, YStack } from "tamagui";

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
      backgroundColor="#F5F5F5"
      borderRadius={8}
      borderWidth={1}
      borderColor="#E0E0E0"
      paddingVertical={16}
      gap={16}
    >
      <Text
        {...typography["heading-16"]}
        textAlign="center"
        onPress={post.onShare}
      >
        Share
      </Text>
      <Separator />
      <Text
        {...typography["heading-16"]}
        textAlign="center"
        onPress={post.onEdit}
      >
        Edit
      </Text>
      <Separator />
      <Text
        {...typography["heading-16"]}
        textAlign="center"
        onPress={() => post.onToggle("comment_on", !post.comment_on)}
      >
        Turn {post.comment_on ? "off" : "on"} commenting
      </Text>
      <Separator />
      <Text
        {...typography["heading-16"]}
        textAlign="center"
        onPress={() => post.onToggle("share_on", !post.share_on)}
      >
        Turn {post.share_on ? "off" : "on"} sharing
      </Text>
      <Separator />
      <Text
        {...typography["heading-16"]}
        textAlign="center"
        color={colors["error"]}
        onPress={post.onDelete}
      >
        Delete
      </Text>
    </YStack>
  );
}
