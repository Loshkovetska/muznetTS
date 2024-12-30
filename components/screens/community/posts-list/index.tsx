import PostItemUser from "@/components/post-item/post-item-user";
import PostShortItem from "@/components/screens/community/posts-list/post-short-item";
import Button from "@/components/ui/button";
import { SCREEN_WIDTH } from "@/lib/constants";
import usePosts from "@/lib/hooks/posts.hook";
import { colors, typography } from "@/tamagui.config";
import { Plus } from "@tamagui/lucide-icons";
import { FlatList } from "react-native";
import { Stack, Text, XStack, YStack } from "tamagui";

type PostsListPropType = {
  type: "my-likes" | "my-posts";
};

export default function PostsList({ type }: PostsListPropType) {
  const { communityUser, myPosts, likedPosts } = usePosts({
    requestType: type,
  });

  const data = type === "my-posts" ? myPosts : likedPosts;
  return (
    <>
      <FlatList
        data={data}
        ListHeaderComponent={
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
        ListFooterComponent={
          type === "my-likes" ? null : (
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
        numColumns={3}
        keyExtractor={(item) => item.id}
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors["white"],
          gap: 1,
          flexGrow: 1,
          paddingBottom: SCREEN_WIDTH,
          minHeight: SCREEN_WIDTH,
        }}
        renderItem={({ item }) => (
          <Stack
            key={item.id}
            width={SCREEN_WIDTH / 3}
            height={SCREEN_WIDTH / 3}
          >
            <PostShortItem {...item} />
          </Stack>
        )}
      />
    </>
  );
}
