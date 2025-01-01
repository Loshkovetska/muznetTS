import PostMediaItem from "@/components/forms/post-form/post-gallery/post-gallery-list/post-media-item";
import { SCREEN_WIDTH } from "@/lib/constants";
import { Asset } from "expo-media-library";
import { FlatList } from "react-native";

type PostGalleryListPropType = {
  albumMedia: Array<Asset>;
  selectedAssets: string[];
  onValueChange: (v: string) => void;
};

export default function PostGalleryList({
  albumMedia,
  selectedAssets,
  onValueChange,
}: PostGalleryListPropType) {
  return (
    <FlatList
      data={albumMedia || []}
      numColumns={4}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={{
        height: SCREEN_WIDTH + 80,
        width: "100%",
      }}
      contentContainerStyle={{
        gap: 1,
        paddingBottom: SCREEN_WIDTH / 2 + 80,
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      onViewableItemsChanged={({ viewableItems }) => {}}
      renderItem={({ item }) => (
        <PostMediaItem
          key={item.id}
          item={item}
          isSelected={selectedAssets.includes(item.id)}
          onValueChange={onValueChange}
        />
      )}
    />
  );
}
