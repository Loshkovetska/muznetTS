import { DatePickerListPropType } from "@/lib/types/date";
import { XStack } from "tamagui";

export default function DaysVerticalList({
  daysGrid,
  getItem,
}: DatePickerListPropType) {
  return (
    <XStack
      flexWrap="wrap"
      width="100%"
      gap={4}
    >
      {daysGrid.map((day, index) => getItem(day, index))}
    </XStack>
  );
}
