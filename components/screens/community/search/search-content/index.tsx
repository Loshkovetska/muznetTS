import SearchTabs from "@/components/screens/community/search/search-tabs";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

type SearchContentPropType = {
  tabs: { id: number; title: string }[];
  tabsFull?: boolean;
  renderItem: (data: { id: number; title: string }) => any;
};

export default function SearchContent({
  tabs,
  tabsFull,
  renderItem,
}: SearchContentPropType) {
  const navigation = useNavigation();
  const ref = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onIndexChange = useCallback((index: number) => {
    ref.current?.scrollToIndex({ animated: true, index: index });
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    navigation.addListener("blur", () => setCurrentIndex(0));

    return () => navigation.removeListener("blur", () => setCurrentIndex(0));
  }, []);

  return (
    <>
      <SearchTabs
        tabs={tabs}
        tabsFull={tabsFull}
        currentIndex={currentIndex}
        setIndex={onIndexChange}
      />
      <FlatList
        ref={ref}
        data={tabs}
        horizontal
        pagingEnabled
        contentContainerStyle={{ paddingTop: 16 }}
        keyExtractor={(item) => String(item.id)}
        onViewableItemsChanged={({ changed }) =>
          setCurrentIndex(changed[0].index || 0)
        }
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        ListHeaderComponentStyle={{ width: "100%" }}
        renderItem={({ item }) => renderItem(item)}
      />
    </>
  );
}
