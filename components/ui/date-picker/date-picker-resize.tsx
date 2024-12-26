import { useCalendarContext } from "@/components/ui/date-picker/calendar-context";
import { colors } from "@/tamagui.config";
import { useCallback } from "react";
import { GestureResponderEvent } from "react-native";
import { Stack } from "tamagui";

export default function DatePickerResize() {
  const { onViewChange } = useCalendarContext();

  const onResponderEnd = useCallback(
    ({ nativeEvent: { changedTouches } }: GestureResponderEvent) => {
      onViewChange(changedTouches[0].locationY < 0);
    },
    [onViewChange]
  );
  return (
    <Stack
      width={32}
      height={4}
      borderRadius={3}
      backgroundColor={colors["black"]}
      alignSelf="center"
      marginTop={12}
      onMoveShouldSetResponderCapture={() => true}
      onScrollShouldSetResponder={() => true}
      onScrollShouldSetResponderCapture={() => true}
      onMoveShouldSetResponder={() => true}
      onStartShouldSetResponder={() => true}
      onResponderEnd={onResponderEnd}
    />
  );
}
