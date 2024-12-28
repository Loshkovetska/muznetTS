import DTPicker from "@/components/ui/date-picker/datetime-picker";
import dayjs, { Dayjs } from "dayjs";

type DatePickerPropType = {
  selectedDate?: Dayjs;
  markedDates?: Dayjs[];
  subBlock?: boolean;
  horizontal?: boolean;
  resize?: boolean;
  onSelect: (d: Date) => void;
};

export default function DatePicker({
  selectedDate,
  markedDates,
  subBlock,
  horizontal = false,
  resize,
  onSelect,
}: DatePickerPropType) {
  return (
    <DTPicker
      date={selectedDate}
      markedDates={markedDates}
      minDate={dayjs().add(-1, "d")}
      subBlock={subBlock}
      horizontal={horizontal}
      resize={resize}
      onChange={(d) => d.date && onSelect(dayjs(d.date).toDate())}
    />
  );
}
