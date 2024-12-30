import { PostType } from "@/lib/types/post";
import { colors, typography } from "@/tamagui.config";
import { Heart, MessageCircle, Send } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Text, XStack } from "tamagui";

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
          fill={colors[post.isLiked ? "black" : "white"]}
          onPress={post.onReact}
        />
        <Text {...typography["heading-14"]}>{post.info.likes}</Text>
      </XStack>
      <Link
        asChild
        href={`/post/${post.id}/comments`}
      >
        <MessageCircle />
      </Link>
      <Send onPress={post.onToggle} />
    </XStack>
  );
}
