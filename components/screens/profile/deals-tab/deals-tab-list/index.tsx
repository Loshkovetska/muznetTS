import DealsTabListItem from "@/components/screens/profile/deals-tab/deals-tab-list/deals-tab-list-item";
import { AdType } from "@/lib/types";
import { useMemo } from "react";
import { FlatList } from "react-native";

type DealsTabListPropType = {
  ads: AdType[];
  tab: "active" | "closed";
  onDealChange: (id: string) => void;
};

export default function DealsTabList({
  ads,
  tab,
  onDealChange,
}: DealsTabListPropType) {
  const tabData = useMemo(
    () => ads.filter((ad) => ad.status === tab),
    [ads, tab]
  );
  return (
    <FlatList
      data={tabData}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: 16,
        paddingBottom: 200,
      }}
      renderItem={({ item }) => (
        <DealsTabListItem
          {...item}
          key={item.id}
          onPress={() => onDealChange(item.id)}
        />
      )}
    />
  );
}
