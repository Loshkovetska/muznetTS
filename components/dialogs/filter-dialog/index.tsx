import BottomBar from "@/components/bottom-bar";
import CommonDialogWrapper from "@/components/common-dialog-wrapper";
import {
  MUSICAL_POSITION,
  SORT_BY,
} from "@/components/dialogs/filter-dialog/constants";
import PriceRange from "@/components/dialogs/filter-dialog/price-range";
import SkillsList from "@/components/forms/skills-list";
import DatePickerInput from "@/components/inputs/date-picker-input";
import SelectProvider from "@/components/providers/select-provider";
import SearchWithSelect from "@/components/search-with-select";
import {
  Button,
  CheckboxWithLabel,
  Input,
  Select,
  SelectContent,
  Text,
} from "@/components/ui";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import { GENRES, INSTRUMENTS } from "@/lib/constants/lists";
import { BaseDialogPropType, FiltersType } from "@/lib/types";
import { X } from "@tamagui/lucide-icons";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { ScrollView, XStack } from "tamagui";

type FilterDialogPropType = {
  selectedFilters: FiltersType;
  totalCount: number;
  hideAddress?: boolean;
  onFilterChange: (name: string, value: any) => void;
  resetFilters: () => void;
} & BaseDialogPropType;

export default function FilterDialog({
  open,
  selectedFilters,
  totalCount,
  hideAddress,
  onOpenChange,
  onFilterChange,
  resetFilters,
}: FilterDialogPropType) {
  const [ref, setRef] = useState<ScrollView | null>(null);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const selectedSort = useMemo(() => {
    return Object.entries(SORT_BY).find(
      ([_, value]) => value === selectedFilters.sort_by
    )?.[0];
  }, [selectedFilters.sort_by]);

  const selectedPosition = useMemo(() => {
    return Object.entries(MUSICAL_POSITION).find(
      ([_, value]) => value === selectedFilters.position
    )?.[0];
  }, [selectedFilters.position]);

  const onValueChange = useCallback(
    (name: string, value: string | string[] | boolean | number[] | Date) => {
      if (name === "sort_by") {
        return onFilterChange(name, SORT_BY[value as "Rating"]);
      }

      if (name === "position") {
        return onFilterChange(name, MUSICAL_POSITION[value as "Anyone"]);
      }

      if (
        name === "price_range" &&
        typeof value !== "boolean" &&
        !(value instanceof Date)
      ) {
        return onFilterChange(name, { min: value[0], max: value[1] });
      }

      onFilterChange(name, value);
    },
    [onFilterChange]
  );

  return (
    <SelectProvider
      coords={coords}
      scrollRef={ref}
    >
      <CommonDialogWrapper
        open={open}
        paddingHorizontal={0}
      >
        <XStack
          alignItems="center"
          width="100%"
          position="relative"
          justifyContent="center"
        >
          <Text
            typo="medium-20"
            textAlign="center"
          >
            Sort and Filter
          </Text>
          <X
            position="absolute"
            top={0}
            right={16}
            size={18}
            onPress={onOpenChange}
          />
        </XStack>
        <ScrollView
          showsVerticalScrollIndicator={false}
          width="100%"
          maxHeight={SCREEN_HEIGHT - 200}
          contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
          onLayout={({ nativeEvent: { layout } }) =>
            setCoords({ x: layout.x, y: layout.y })
          }
          ref={(e) => {
            setRef(e);
          }}
        >
          <Select
            name="sort_by"
            value={selectedSort === "None" ? "" : selectedSort || ""}
            placeholder="Sort By"
            options={Object.keys(SORT_BY)}
          />
          {selectedFilters.user_type === "musician" && (
            <Select
              name="position"
              value={
                selectedPosition === "Anyone" ? "" : selectedPosition || ""
              }
              placeholder="Type of musician"
              options={Object.keys(MUSICAL_POSITION)}
            />
          )}
          <SearchWithSelect
            name="musical_genres"
            options={GENRES}
            placeholder="Choose musical genres"
            selected={selectedFilters.musical_genres}
            onChange={onValueChange}
            edit
          />
          <SearchWithSelect
            name="musical_instruments"
            options={INSTRUMENTS}
            placeholder="Choose musical instruments"
            selected={selectedFilters.musical_instruments}
            onChange={onValueChange}
            edit
          />
          {!hideAddress && (
            <Input
              placeholder="Enter location"
              value={selectedFilters.location}
              onChangeText={(v) => onValueChange("location", v)}
            />
          )}
          {selectedFilters.user_type === "contractor" && (
            <DatePickerInput
              selectedDate={selectedFilters.date || dayjs().toDate()}
              onSelect={(date) => onValueChange("date", date)}
            />
          )}
          <CheckboxWithLabel
            name="willing_to_travel"
            checked={selectedFilters.willing_to_travel}
            label="Willing to travel interstate for gigs"
            onCheckedChange={(v) => onValueChange("willing_to_travel", v)}
          />

          <PriceRange
            priceRange={selectedFilters.price_range}
            onValueChange={(v) => onValueChange("price_range", v)}
          />
          <SkillsList
            selectedValues={selectedFilters}
            onChange={onValueChange}
          />
        </ScrollView>
        <BottomBar
          alignItems="center"
          gap={32}
          justifyContent="space-between"
          width={SCREEN_WIDTH}
        >
          <Text
            typo="reg-17"
            paddingLeft={16}
            onPress={resetFilters}
          >
            Clear all
          </Text>
          <Button
            variant="dark"
            sizeB="lg"
            maxWidth={227}
            disabled={!totalCount}
            onPress={onOpenChange}
          >
            Show {totalCount > 200 ? "200+" : totalCount}{" "}
            {selectedFilters?.user_type === "musician" ? "musicians" : "ads"}
          </Button>
        </BottomBar>
      </CommonDialogWrapper>
      <SelectContent onValueChange={onValueChange} />
    </SelectProvider>
  );
}
