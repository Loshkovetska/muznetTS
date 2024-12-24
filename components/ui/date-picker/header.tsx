import { HeaderProps } from "@/lib/types/date";
import { typography } from "@/tamagui.config";
import dayjs from "dayjs";
import React, { useCallback } from "react";
import { Pressable, View } from "react-native";
import { Text, XStack } from "tamagui";
import { useCalendarContext } from "./calendar-context";

const Header = ({ buttonPrevIcon, buttonNextIcon }: HeaderProps) => {
  const { currentDate, theme, locale, onChangeMonth } = useCalendarContext();

  const currentMonthText = dayjs(currentDate).locale(locale).format("MMMM");

  const button = useCallback(
    (type: "prev" | "next") => (
      <Pressable
        onPress={() => onChangeMonth(type === "prev" ? -1 : 1)}
        accessibilityRole="button"
        accessibilityLabel={type === "prev" ? "Prev" : "Next"}
      >
        <View style={[theme?.headerButtonStyle]}>
          {type === "prev" ? buttonPrevIcon : buttonNextIcon}
        </View>
      </Pressable>
    ),
    [onChangeMonth]
  );

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      accessibilityRole="header"
    >
      <Text {...typography["heading-17"]}>
        {currentMonthText} {dayjs(currentDate).format("YYYY")}
      </Text>
      <XStack alignItems="center">
        {button("prev")}
        {button("next")}
      </XStack>
    </XStack>
  );
};

export default Header;
