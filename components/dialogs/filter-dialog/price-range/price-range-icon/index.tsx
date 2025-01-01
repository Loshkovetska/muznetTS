import PriceIcon from "@/components/dialogs/filter-dialog/price-range/icon";
import { colors } from "@/tamagui.config";
import { Stack, XStack } from "tamagui";

export default function PriceRangeIcon({
  min,
  max,
}: {
  min: number;
  max: number;
}) {
  return (
    <XStack
      position="absolute"
      bottom={12}
      left={0}
      width="100%"
      overflow="hidden"
    >
      <Stack
        position="absolute"
        left={0}
        backgroundColor={colors["main"]}
        width={min}
        height={39}
        zIndex={2}
      />
      <PriceIcon />
      <PriceIcon />
      <PriceIcon />
      <PriceIcon />
      <Stack
        position="absolute"
        right={0}
        backgroundColor={colors["main"]}
        width={max}
        height={39}
        zIndex={2}
      />
    </XStack>
  );
}
