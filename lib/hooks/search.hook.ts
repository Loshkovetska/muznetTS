import { useUser } from "@/components/providers/user-provider";
import { QUERY_TAGS } from "@/lib/constants";
import { SearchService } from "@/lib/services";
import { FiltersType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

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

export function useSearch() {
  const { isMusician } = useUser();
  const local = useLocalSearchParams();

  const [isOpen, setOpen] = useState(false);

  const [filters, setFilters] = useState<FiltersType>({
    ...DEFAULT_VALUES,
    q: local?.q as string,
    user_type: isMusician ? "contractor" : "musician",
  });

  const { data } = useQuery({
    queryKey: [
      QUERY_TAGS[isMusician ? "MUSICIAN" : "AD"],
      ...Object.values(filters),
      local?.q as string,
    ],
    queryFn: () => SearchService.search({ ...filters, q: local?.q as string }),
  });

  const onFilterChange = useCallback((name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onResetFilters = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      ...DEFAULT_VALUES,
    }));
    router.setParams({ q: "" });
  }, []);

  return {
    data,
    isOpen,
    local,
    filters,
    onFilterChange,
    onResetFilters,
    setOpen,
  };
}
