import PostMediaItem from "@/components/forms/post-form/post-gallery/post-gallery-list/post-media-item";
import { SCREEN_HEIGHT } from "@/lib/constants";
import { Asset } from "expo-media-library";
import { FlatList } from "react-native";

type PostGalleryListPropType = {
  albumMedia: Asset[];
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
      contentContainerStyle={{
        paddingBottom: SCREEN_HEIGHT / 2,
        gap: 1,
      }}
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
