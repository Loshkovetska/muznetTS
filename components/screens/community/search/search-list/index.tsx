import SearchItem from "@/components/screens/community/search/search-list/search-item";
import { SCREEN_WIDTH } from "@/lib/constants";
import useSearchPosts from "@/lib/hooks/search-posts.hook";
import { useMemo } from "react";
import { FlatList } from "react-native";

type SearchListType = "all" | "recent" | "top" | "place";

export default function SearchList({
  type,
  searchValue,
}: {
  type: SearchListType;
  searchValue: string;
}) {
  const { postsLocations, postsTags, recentData, topTags } = useSearchPosts();

  const list = useMemo(
    () =>
      type === "all"
        ? [...postsTags, ...postsLocations]
        : type === "place"
        ? postsLocations
        : type === "recent"
        ? recentData
        : topTags,
    [postsTags, postsLocations, topTags, recentData]
  );

  const data = useMemo(
    () =>
      searchValue.length
        ? list.filter((l) =>
            l.name
              .slice(0, searchValue.length)
              .toLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          )
        : list,
    [list, searchValue]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 250,
      }}
      style={{ width: SCREEN_WIDTH }}
      renderItem={({ item }) => (
        <SearchItem
          {...item}
          key={item.name}
        />
      )}
    />
  );
}
