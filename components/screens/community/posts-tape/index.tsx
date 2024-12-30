import PostItem from "@/components/post-item";
import usePosts from "@/lib/hooks/posts.hook";
import { PostType } from "@/lib/types/post";
import { colors } from "@/tamagui.config";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

type PostsTapePropType = {
  data?: PostType[];
  paddingTop?: number;
  paddingBottom?: number;
  initialIndex?: number;
};

export default function PostsTape({
  paddingBottom = 500,
  paddingTop,
  data,
  initialIndex = 0,
}: PostsTapePropType) {
  const { allPosts } = usePosts({ requestType: data ? undefined : "all" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    if (ref.current && typeof initialIndex === "number") {
      setTimeout(() => {
        ref.current?.scrollToIndex({
          animated: false,
          index: initialIndex,
          viewOffset: 50,
        });
      }, 400);
    }
  }, [initialIndex]);

  return (
    <FlatList
      ref={ref}
      data={data || allPosts || []}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: colors["white"],
        paddingBottom: paddingBottom,
        gap: 32,
        paddingTop: paddingTop,
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100,
      }}
      onViewableItemsChanged={({ changed }) =>
        setCurrentIndex(changed[0].index || 0)
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <PostItem
          {...item}
          key={item.id}
          inView={currentIndex === index}
        />
      )}
      onScrollToIndexFailed={(info) => console.log(info)}
    />
  );
}
