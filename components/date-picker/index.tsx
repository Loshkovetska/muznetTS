import { SelectTrigger } from "@/components/ui/select";
import { colors, typography } from "@/tamagui.config";
import { Calendar, ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import dayjs from "dayjs";
import { useState } from "react";
import DTPicker from "react-native-ui-datepicker";
import { YStack } from "tamagui";

type DatePickerPropType = {
  selectedDate: Date;
  onSelect: (d: Date) => void;
};

export default function DatePicker({
  selectedDate,
  onSelect,
}: DatePickerPropType) {
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
        <YStack
          borderInlineWidth={1}
          borderBottomWidth={1}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
          borderColor={colors["default-gray"]}
          justifyContent="center"
          paddingHorizontal={12}
          paddingBottom={16}
        >
          <DTPicker
            height={"auto" as any}
            date={selectedDate}
            onChange={(d) => d.date && onSelect(dayjs(d.date).toDate())}
            minDate={dayjs().set("d", -1)}
            mode="single"
            buttonNextIcon={<ChevronRight />}
            buttonPrevIcon={<ChevronLeft />}
            headerButtonsPosition="right"
            headerTextStyle={typography["heading-17"]}
            headerTextContainerStyle={{
              paddingHorizontal: 0,
              paddingVertical: 0,
              paddingRight: 2,
            }}
            headerContainerStyle={{
              paddingHorizontal: 0,
              justifyContent: "space-between",
            }}
            weekDaysTextStyle={{
              ...typography["paragraph-12"],
              fontFamily: "MulishBold",
              textTransform: "uppercase",
              color: "rgba(60,60,67,0.3)",
              textAlign: "center",
              minWidth: 35,
              maxWidth: 35,
            }}
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
      )}
    </YStack>
  );
}
