import DealsTabListItem from "@/components/screens/profile/deals-tab/deals-tab-list/deals-tab-list-item";
import { DealType } from "@/lib/types/deal";
import { useMemo } from "react";
import { FlatList } from "react-native";

type DealsTabListPropType = {
  deals: DealType[];
  tab: "active" | "closed";
  onDealChange: (id: string) => void;
};

export default function DealsTabList({
  deals,
  tab,
  onDealChange,
}: DealsTabListPropType) {
  const tabData = useMemo(
    () => deals.filter((ad) => ad.status === tab),
    [deals, tab]
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
