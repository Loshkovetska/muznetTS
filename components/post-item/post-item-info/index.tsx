import { PostType } from "@/lib/types/post";
import { colors, typography } from "@/tamagui.config";
import dayjs from "dayjs";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Text, XStack, YStack } from "tamagui";

export default function PostItemInfo(
  post: PostType & { showFullDescription?: boolean }
) {
  const [showMore, setShowMore] = useState(false);

  const description = useMemo(
    () =>
      post.description.slice(
        0,
        !showMore && !post.showFullDescription ? 100 : post.description.length
      ),
    [post.description, showMore, post.showFullDescription]
  );
  return (
    <YStack gap={8}>
      <YStack gap={4}>
        <Text {...typography["bold-16"]}>{post.title}</Text>
        <Text {...typography["medium-14"]}>
          {description}
          {post.description.length > 100 && !post.showFullDescription && (
            <Text
              {...typography["medium-14"]}
              backgroundColor={colors["main"]}
              onPress={() => setShowMore((prev) => !prev)}
            >
              {showMore ? " " : "... "}
              <Text
                textDecorationLine="underline"
                color={colors["gray-80"]}
              >
                {showMore ? "less" : "more"}
              </Text>
            </Text>
          )}
        </Text>
        {post.tags.length > 0 && (
          <XStack
            alignItems="center"
            flexWrap="wrap"
            gap={10}
            marginTop={8}
          >
            {post.tags.map((tag) => (
              <XStack
                key={tag}
                paddingVertical={8}
                paddingHorizontal={16}
                borderWidth={1}
                borderColor={colors["light-gray"]}
                borderRadius={6}
              >
                <Text {...typography["medium-13"]}>{tag}</Text>
              </XStack>
            ))}
          </XStack>
        )}
      </YStack>
      {!post.showFullDescription && (
        <Link
          asChild
          href={`/post/${post.id}/comments`}
        >
          <Text
            {...typography["bold-14"]}
            marginVertical={4}
            color={colors["gray-80"]}
            onPress={() => {}}
          >
            View all comments
          </Text>
        </Link>
      )}
      <Text
        {...typography["medium-14"]}
        color={colors["gray-80"]}
      >
        {dayjs(post.created_at).fromNow()}
      </Text>
    </YStack>
  );
}
