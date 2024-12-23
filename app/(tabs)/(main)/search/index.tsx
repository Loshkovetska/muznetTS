import CommonHeader from "@/components/common-header";
import FilterDialog from "@/components/dialogs/filter-dialog";
import { useUser } from "@/components/providers/user-provider";
import AdsItem from "@/components/screens/homescreen/ads-list/ads-item";
import SearchWithFilter from "@/components/search-with-filter";
import { QUERY_TAGS } from "@/lib/constants";
import SearchService from "@/lib/services/search";
import { FiltersType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { YStack } from "tamagui";

const DEFAULT_VALUES = {
  sort_by: undefined,
  musical_genres: [],
  musical_instruments: [],
  location: "",
  willing_to_travel: false,
  price_range: {
    min: 0,
    max: 1000,
  },
  sing_by_ear: false,
  play_by_ear: false,
  read_sheet_music: false,
};

export default function Page() {
  const { isMusician } = useUser();

  const [isOpen, setOpen] = useState(false);

  const [filters, setFilters] = useState<FiltersType>({
    ...DEFAULT_VALUES,
    user_type: isMusician ? "contractor" : "musician",
  });

  const { data } = useQuery({
    queryKey: [
      isMusician ? QUERY_TAGS.MUSICIAN : QUERY_TAGS.AD,
      ...Object.values(filters),
    ],
    queryFn: () => SearchService.search(filters),
  });

  const onFilterChange = useCallback((name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onResetFilters = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      ...DEFAULT_VALUES,
    }));
  }, []);

  return (
    <>
      <YStack
        backgroundColor={colors["white"]}
        flexGrow={1}
        paddingHorizontal={16}
        gap={16}
      >
        <CommonHeader title="Search" />
        <SearchWithFilter onFilter={() => setOpen(true)} />
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
