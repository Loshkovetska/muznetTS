import AdsItem from "@/components/screens/homescreen/ads-list/ads-item";
import { SCREEN_WIDTH } from "@/lib/constants";
import { AdType, UserType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { FlatList } from "react-native";
import { Stack } from "tamagui";

type MapListPropType = {
  data: Array<UserType | AdType>;
  zIndex: number;
  mapListRef: React.RefObject<FlatList>;
  onIndexChange: (id: number) => void;
};

const ITEM_WIDTH = SCREEN_WIDTH;

export default function MapList({
  data,
  zIndex,
  mapListRef,
  onIndexChange,
}: MapListPropType) {
  return (
    <FlatList
      ref={mapListRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={data?.length > 1}
      pagingEnabled
      style={{
        position: "absolute",
        bottom: 56,
        left: 0,
        width: "100%",
        zIndex: zIndex,
      }}
      snapToAlignment="center"
      data={data}
      onViewableItemsChanged={(info) => {
        onIndexChange(info.viewableItems[0].index || 0);
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 1,
      }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Stack
          key={item.id}
          width={ITEM_WIDTH}
          paddingHorizontal={8}
          paddingVertical={8}
          shadowOffset={{ width: 0, height: 0 }}
          shadowOpacity={0.2}
          shadowRadius={4}
          shadowColor={colors["black"]}
        >
          <AdsItem {...item} />
        </Stack>
      )}
    />
  );
}
