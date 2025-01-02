import CommonHeader from "@/components/common-header";
import PostsTile from "@/components/screens/community/posts-tile";
import SearchContent from "@/components/screens/community/search/search-content";
import { Text } from "@/components/ui";
import usePostsByFilter from "@/lib/hooks/posts-by-filter.hook";
import { colors } from "@/tamagui.config";
import { useLocalSearchParams } from "expo-router";
import { YStack } from "tamagui";

export default function Page() {
  const params = useLocalSearchParams() as {
    [key in "tag" | "place" | "count"]: string;
  };

  const { fullData } = usePostsByFilter(params);

  return (
    <YStack
      backgroundColor={colors["main"]}
      flexGrow={1}
    >
      <CommonHeader
        title={
          <Text
            typo="bold-20"
            textTransform="capitalize"
            textAlign="center"
            flexGrow={1}
          >
            {params.tag || params.place}
            <Text
              typo="medium-14"
              color={"gray-60"}
            >
              {"  "}({params.count} posts)
            </Text>
          </Text>
        }
        withBorder
      />
      <SearchContent
        tabsFull
        tabs={[
          { id: 0, title: "Top" },
          { id: 1, title: "Recent" },
        ]}
        renderItem={(item) => (
          <PostsTile
            key={item.id}
            requestType={`search&${params.tag ? "tag" : "place"}=${
              params.tag || params.place
            }&sort_by=${item.title.toLowerCase()}`}
            data={fullData[item.id]}
          />
        )}
      />
    </YStack>
  );
}
