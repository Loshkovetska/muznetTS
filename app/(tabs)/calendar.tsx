import CalendarItem from "@/components/screens/calendar";
import DatePicker from "@/components/ui/date-picker";
import useCalendar from "@/lib/hooks/calendar.hook";
import { colors, typography } from "@/tamagui.config";
import dayjs from "dayjs";
import { useState } from "react";
import { FlatList } from "react-native";
import { Text, XStack, YStack } from "tamagui";

export default function Calendar() {
  const { ads, markedDates, selectedDate, setSelectedDate } = useCalendar();
  const [height, setHeight] = useState(300);

  return (
    <YStack
      paddingTop={88}
      paddingHorizontal={16}
      backgroundColor={colors["white"]}
      flexGrow={1}
      gap={24}
    >
      <YStack
        gap={24}
        onLayout={({ nativeEvent: { layout } }) => setHeight(layout.height)}
      >
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            fontSize={34}
            lineHeight={41}
            fontFamily="MulishBold"
          >
            Calendar
          </Text>
          <Text
            {...typography["label-17"]}
            onPress={() => setSelectedDate(undefined)}
          >
            See all
          </Text>
        </XStack>
        <DatePicker
          horizontal
          resize
          markedDates={markedDates}
          selectedDate={selectedDate ? dayjs(selectedDate) : undefined}
          onSelect={setSelectedDate}
        />
      </YStack>
      {ads?.length > 0 && (
        <FlatList
          data={ads}
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ gap: 16, paddingBottom: height + 150 }}
          keyExtractor={(i) => i.id}
          renderItem={({ item, index }) => (
            <CalendarItem
              {...item}
              key={item.id}
              order={index}
            />
          )}
        />
      )}
      {!ads.length && (
        <YStack
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          paddingBottom={150}
        >
          <Text
            textAlign="center"
            {...typography["heading-18"]}
          >
            No ads were found on this date!
          </Text>
        </YStack>
      )}
    </YStack>
  );
}
