import CommonHeader from "@/components/common-header";
import PostsTile from "@/components/screens/community/posts-tile";
import SearchContent from "@/components/screens/community/search/search-content";
import usePostsByFilter from "@/lib/hooks/posts-by-filter.hook";
import { colors, typography } from "@/tamagui.config";
import { useLocalSearchParams } from "expo-router";
import { Text, YStack } from "tamagui";

export default function Page() {
  const params = useLocalSearchParams() as {
    [key in "tag" | "place" | "count"]: string;
  };

  const { fullData } = usePostsByFilter(params);

  return (
    <YStack
      backgroundColor={colors["white"]}
      flexGrow={1}
    >
      <CommonHeader
        title={
          <Text
            {...typography["heading-20"]}
            textTransform="capitalize"
            textAlign="center"
            flexGrow={1}
          >
            {params.tag || params.place}
            <Text
              {...typography["label-14"]}
              color="rgba(92, 101, 116, 0.6)"
            >
              {"  "}({params.count} posts)
            </Text>
          </Text>
        }
        paddingBottom={10}
        borderBottomWidth={1}
        borderColor="rgba(92, 101, 116, 0.2)"
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
