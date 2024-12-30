import PostShortItem from "@/components/screens/community/posts-list/post-short-item";
import { SCREEN_WIDTH } from "@/lib/constants";
import { PostType } from "@/lib/types/post";
import { colors } from "@/tamagui.config";
import { Link } from "expo-router";
import { FlatList } from "react-native";
import { Stack } from "tamagui";

type PostsTilePropType = {
  data: PostType[];
  requestType?: string;
  listHeaderComponent?: React.ReactElement;
  listFooterComponent?: React.ReactElement;
};

export default function PostsTile({
  data,
  requestType,
  listHeaderComponent,
  listFooterComponent,
}: PostsTilePropType) {
  return (
    <FlatList
      data={data}
      nestedScrollEnabled
      ListHeaderComponent={listHeaderComponent}
      ListFooterComponent={listFooterComponent}
      numColumns={3}
      keyExtractor={(item) => item?.id || "1"}
      style={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: colors["white"],
        gap: 1,
        flexGrow: 1,
        paddingBottom: SCREEN_WIDTH,
        minHeight: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
      }}
      renderItem={({ item, index }) => (
        <Link
          asChild
          href={`/(tabs)/(community)/tape?index=${index}&request=${requestType}`}
        >
          <Stack
            key={item?.id || "1"}
            width={SCREEN_WIDTH / 3}
            height={SCREEN_WIDTH / 3}
          >
            <PostShortItem {...item} />
          </Stack>
        </Link>
      )}
    />
  );
}
