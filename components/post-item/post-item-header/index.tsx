import PostItemUser from "@/components/post-item/post-item-user";
import { PostType } from "@/lib/types/post";
import { Ellipsis } from "@tamagui/lucide-icons";
import { XStack } from "tamagui";

export default function PostItemHeader(
  post: PostType & { toggleState: () => void }
) {
  return (
    <XStack
      alignItems="center"
      paddingHorizontal={16}
    >
      <PostItemUser
        {...post.user}
        postLocation={post.location}
      />
      <Ellipsis onPress={post.toggleState} />
    </XStack>
  );
}
