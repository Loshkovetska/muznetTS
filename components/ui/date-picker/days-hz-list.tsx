import { DatePickerListPropType } from "@/lib/types/date";
import { FlatList } from "react-native";

export default function DaysHZList({
  daysGrid,
  getItem,
}: DatePickerListPropType) {
  return (
    <FlatList
      data={daysGrid}
      horizontal
      pagingEnabled
      style={{ width: "100%" }}
      contentContainerStyle={{ gap: 4, alignItems: "center" }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => item?.date || String(index)}
      renderItem={({ item: day, index }) => getItem(day, index) as any}
    />
  );
}
