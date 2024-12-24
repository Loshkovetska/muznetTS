import DTPicker from "@/components/ui/date-picker/datetime-picker";
import { colors, typography } from "@/tamagui.config";
import dayjs, { Dayjs } from "dayjs";
import { GetProps, YStack } from "tamagui";

type DatePickerPropType = {
  selectedDate?: Dayjs;
  markedDates?: Dayjs[];
  onSelect: (d: Date) => void;
} & GetProps<typeof YStack>;

export default function DatePicker({
  selectedDate,
  markedDates,
  onSelect,
  ...rest
}: DatePickerPropType) {
  return (
    <YStack
      borderInlineWidth={1}
      borderBottomWidth={1}
      borderBottomRightRadius={6}
      borderBottomLeftRadius={6}
      borderColor={colors["default-gray"]}
      justifyContent="center"
      paddingHorizontal={12}
      paddingBottom={16}
      width="100%"
      {...rest}
    >
      <DTPicker
        date={selectedDate}
        markedDates={markedDates}
        onChange={(d) => d.date && onSelect(dayjs(d.date).toDate())}
        minDate={dayjs().set("d", -1)}
        dayContainerStyle={{
          minWidth: 35,
          maxWidth: 35,
          height: 37,
          borderRadius: 6,
        }}
        todayTextStyle={{
          color: colors["black"],
        }}
        calendarTextStyle={{
          color: "#141517",
          ...typography["paragraph-17"],
        }}
        selectedItemColor="#141517"
        selectedTextStyle={{
          color: colors["white"],
          borderWidth: 0,
        }}
      />
    </YStack>
  );
}
