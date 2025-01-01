import CommonHeader from "@/components/common-header";
import PostsTape from "@/components/screens/community/posts-tape";
import usePostsByFilter from "@/lib/hooks/posts-by-filter.hook";
import usePosts from "@/lib/hooks/posts.hook";
import { colors, typography } from "@/tamagui.config";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Text, YStack } from "tamagui";

type ParamsType = {
  index: number;
  tag?: string;
  place?: string;
  request: "search" | "my-posts" | "my-likes";
  sort_by?: "recent" | "top";
};

export default function Tape() {
  const local = useLocalSearchParams<any>() as ParamsType;

  const { topData, recentData } = usePostsByFilter(local);
  const { likedPosts, myPosts, communityUser } = usePosts({
    requestType: local.request as "my-likes",
  });

  const TITLE = useMemo(() => {
    if (local?.request === "my-likes" || local.request === "my-posts")
      return `${communityUser?.name} ${communityUser?.surname}`;

    const title = local?.tag || local?.place || "";

    return (
      <YStack
        gap={2}
        alignItems="center"
      >
        <Text
          {...typography["semi-12"]}
          color={colors["third"]}
          textAlign="center"
        >
          {local?.sort_by?.[0].toUpperCase()}
          {local?.sort_by?.slice(1)} Posts
        </Text>
        <Text
          textAlign="center"
          {...typography["bold-20"]}
        >
          {title?.[0].toUpperCase()}
          {title?.slice(1)}
        </Text>
      </YStack>
    );
  }, [local?.request, communityUser]);

  const data = useMemo(() => {
    if (local.request === "my-likes") return likedPosts;
    if (local.request === "my-posts") return myPosts;
    if (local.sort_by === "recent") return recentData;
    return topData;
  }, [local.request, likedPosts, myPosts]);

  return (
    <YStack backgroundColor={colors["main"]}>
      <CommonHeader
        title={TITLE}
        withBorder
      />
      <PostsTape
        data={data}
        initialIndex={Number(local.index)}
        paddingBottom={260}
        paddingTop={16}
      />
    </YStack>
  );
}
