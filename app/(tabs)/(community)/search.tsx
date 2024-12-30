import SEARCH_TABS from "@/components/screens/community/search/constants";
import SearchContent from "@/components/screens/community/search/search-content";
import SearchHeader from "@/components/screens/community/search/search-header";
import SearchList from "@/components/screens/community/search/search-list";
import useSearchPosts from "@/lib/hooks/search-posts.hook";
import { colors } from "@/tamagui.config";
import { useCallback, useState } from "react";
import { YStack } from "tamagui";

export default function Page() {
  const [searchValue, setValue] = useState("");

  useSearchPosts(true);

  const renderItem = useCallback(
    (item: { id: number; title: string }) => (
      <SearchList
        key={item.id}
        searchValue={searchValue}
        type={item.title.toLowerCase() as "all"}
      />
    ),
    [searchValue]
  );

  return (
    <YStack
      backgroundColor={colors["white"]}
      flexGrow={1}
    >
      <SearchHeader
        searchValue={searchValue}
        setValue={setValue}
      />
      <SearchContent
        tabs={SEARCH_TABS}
        renderItem={renderItem}
      />
    </YStack>
  );
}
