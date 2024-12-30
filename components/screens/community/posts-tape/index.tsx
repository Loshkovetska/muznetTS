import PostItem from "@/components/post-item";
import usePosts from "@/lib/hooks/posts.hook";
import { colors } from "@/tamagui.config";
import { useState } from "react";
import { FlatList } from "react-native";

export default function PostsTape() {
  const { allPosts } = usePosts({ requestType: "all" });
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <FlatList
      data={allPosts || []}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: colors["white"],
        paddingBottom: 500,
        gap: 32,
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
    />
  );
}
