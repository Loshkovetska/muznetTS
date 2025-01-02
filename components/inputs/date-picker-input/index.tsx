import { SelectTrigger } from "@/components/ui";
import DatePicker from "@/components/ui/date-picker";
import { Calendar } from "@tamagui/lucide-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { YStack } from "tamagui";

type DatePickerInputPropType = {
  selectedDate: Date;
  onSelect: (d: Date) => void;
};

export default function DatePickerInput({
  selectedDate,
  onSelect,
}: DatePickerInputPropType) {
  const [isOpen, setOpen] = useState(false);

  return (
    <YStack width="100%">
      <SelectTrigger
        triggerIcon={<Calendar size={18} />}
        isOpen={isOpen}
        placeholder="Select date"
        value={selectedDate.toLocaleString("en-En", {
          weekday: "long",
          month: "short",
          day: "2-digit",
        })}
        borderWidth={1}
        onPress={() => setOpen((prev) => !prev)}
      />
      {isOpen && (
        <DatePicker
          selectedDate={dayjs(selectedDate)}
          subBlock
          onSelect={onSelect}
        />
      )}
    </YStack>
  );
}
