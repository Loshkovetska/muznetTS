import PostItemUser from "@/components/post-item/post-item-user";
import PostsTile from "@/components/screens/community/posts-tile";
import { Button, Text } from "@/components/ui";
import { usePosts } from "@/lib/hooks";
import { Plus } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { XStack, YStack } from "tamagui";

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
          <Text typo="bold-16">
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
              typo="medium-14"
              textAlign="center"
              color="gray-60"
            >
              {data?.length} {data?.length === 1 ? "Post" : "Posts"}
            </Text>
            <Link
              asChild
              href="/(tabs)/(community)/add-post"
            >
              <Button
                iconLeft={<Plus />}
                sizeB="lg"
                variant="white"
                justifyContent="center"
              >
                Add new Post
              </Button>
            </Link>
          </YStack>
        )
      }
    />
  );
}
