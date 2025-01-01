import PriceRangeIcon from "@/components/dialogs/filter-dialog/price-range/price-range-icon";
import Slider from "@/components/ui/slider";
import { typography } from "@/tamagui.config";
import { Text, XStack, YStack } from "tamagui";

type PriceRangePropType = {
  priceRange: { min: number; max: number };
  onValueChange: (num: number[]) => void;
};

export default function PriceRange({
  priceRange,
  onValueChange,
}: PriceRangePropType) {
  return (
    <YStack gap={40}>
      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <Text {...typography["bold-17"]}>Price Range:</Text>
        <Text {...typography["bold-15"]}>
          ${priceRange.min} - ${priceRange.max}
        </Text>
      </XStack>
      <Slider
        min={0}
        max={1000}
        onValueChange={onValueChange}
        defaultValues={[priceRange.min, priceRange.max]}
      >
        <PriceRangeIcon
          min={0}
          max={0}
        />
      </Slider>
    </YStack>
  );
}
