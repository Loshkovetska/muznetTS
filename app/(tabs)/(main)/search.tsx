import CommonHeader from "@/components/common-header";
import FilterDialog from "@/components/dialogs/filter-dialog";
import AdsItem from "@/components/screens/homescreen/ads-list/ads-item";
import SearchWithFilter from "@/components/search-with-filter";
import { useSearch } from "@/lib/hooks";
import { colors } from "@/tamagui.config";
import { FlatList } from "react-native";
import { YStack } from "tamagui";

export default function Page() {
  const {
    data,
    isOpen,
    local,
    filters,
    onResetFilters,
    onFilterChange,
    setOpen,
  } = useSearch();
  return (
    <>
      <YStack
        backgroundColor={colors["main"]}
        flexGrow={1}
        paddingHorizontal={16}
        gap={16}
      >
        <CommonHeader title="Search" />
        <SearchWithFilter
          q={local?.q as string}
          onFilter={() => setOpen(true)}
        />
        <FlatList
          data={data || []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <AdsItem
              key={item.id}
              {...item}
            />
          )}
        />
      </YStack>
      <FilterDialog
        open={isOpen}
        selectedFilters={filters}
        totalCount={data?.length || 0}
        onFilterChange={onFilterChange}
        resetFilters={onResetFilters}
        onOpenChange={() => setOpen(false)}
      />
    </>
  );
}
