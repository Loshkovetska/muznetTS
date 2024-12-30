import PostItemUser from "@/components/post-item/post-item-user";
import PostsTile from "@/components/screens/community/posts-tile";
import Button from "@/components/ui/button";
import usePosts from "@/lib/hooks/posts.hook";
import { typography } from "@/tamagui.config";
import { Plus } from "@tamagui/lucide-icons";
import { Text, XStack, YStack } from "tamagui";

type PostsListPropType = {
  type: "my-likes" | "my-posts";
};

export default function PostsList({ type }: PostsListPropType) {
  const { communityUser, myPosts, likedPosts } = usePosts({
    requestType: type,
  });

  const data = type === "my-posts" ? myPosts : likedPosts;
  return (
    <PostsTile
      requestType={type}
      data={data || []}
      listHeaderComponent={
        <XStack
          alignItems="center"
          justifyContent="space-between"
          padding={16}
          paddingTop={0}
        >
          {communityUser && <PostItemUser {...communityUser} />}
          <Text {...typography["heading-16"]}>
            {data?.length} {data?.length === 1 ? "Post" : "Posts"}
          </Text>
        </XStack>
      }
      listFooterComponent={
        type === "my-likes" ? undefined : (
          <YStack
            width="100%"
            alignItems="center"
            padding={16}
            gap={16}
          >
            <Text
              {...typography["label-14"]}
              textAlign="center"
              color="rgba(92, 101, 116, 0.6)"
            >
              {data?.length} {data?.length === 1 ? "Post" : "Posts"}
            </Text>
            <Button
              iconLeft={<Plus />}
              sizeB="lg"
              variant="white"
              justifyContent="center"
              onPress={() => {
                //add post
              }}
            >
              Add new Post
            </Button>
          </YStack>
        )
      }
    />
  );
}
