import DatePicker from "@/components/ui/date-picker";
import useAds from "@/lib/hooks/ads.hook";
import { colors } from "@/tamagui.config";
import dayjs from "dayjs";
import { Text, YStack } from "tamagui";

export default function Calendar() {
  const { ads } = useAds({});
  return (
    <YStack
      paddingTop={88}
      paddingHorizontal={16}
      backgroundColor={colors["white"]}
      flexGrow={1}
      gap={24}
    >
      <Text
        fontSize={34}
        lineHeight={41}
        fontFamily="MulishBold"
      >
        Calendar
      </Text>
      <DatePicker
        selectedDate={dayjs()}
        onSelect={() => {}}
        borderWidth={1}
        borderRadius={6}
      />
      {/* {ads && (
        <FlatList
          data={[...ads, ...ads]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingBottom: 300 }}
          keyExtractor={(i) => i.id}
          renderItem={({ item, index }) => (
            <CalendarItem
              {...item}
              key={item.id}
              order={index}
            />
          )}
        />
      )} */}
    </YStack>
  );
}
