import Text from "@/components/ui/text";
import { PostType } from "@/lib/types/post";
import { colors } from "@/tamagui.config";
import { Heart, MessageCircle, Send } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { XStack } from "tamagui";

export default function PostItemFunc(
  post: PostType & {
    isLiked: boolean;
    onToggle: () => void;
    onReact: () => void;
  }
) {
  return (
    <XStack
      alignItems="center"
      gap={16}
    >
      <XStack
        alignItems="center"
        gap={8}
      >
        <Heart
          fill={colors[post.isLiked ? "black" : "main"]}
          onPress={post.onReact}
        />
        <Text typo="bold-14">{post.info.likes}</Text>
      </XStack>
      <Link href={`/post/${post.id}/comments`}>
        <MessageCircle />
      </Link>
      <Send onPress={post.onToggle} />
    </XStack>
  );
}
