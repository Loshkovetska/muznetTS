import { typography } from "@/tamagui.config";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import dayjs from "dayjs";
import React, { useCallback, useMemo } from "react";
import { Pressable } from "react-native";
import { Text, XStack } from "tamagui";
import { useCalendarContext } from "./calendar-context";

const Header = () => {
  const { currentDate, locale, onChangeMonth } = useCalendarContext();

  const currentText = useMemo(
    () =>
      `${dayjs(currentDate).locale(locale).format("MMMM")} ${dayjs(
        currentDate
      ).format("YYYY")}`,
    [currentDate, locale]
  );

  const button = useCallback(
    (type: "prev" | "next") => (
      <Pressable onPress={() => onChangeMonth(type === "prev" ? -1 : 1)}>
        {type === "prev" ? <ChevronLeft /> : <ChevronRight />}
      </Pressable>
    ),
    [onChangeMonth]
  );

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      height={44}
      paddingHorizontal={12}
    >
      <Text {...typography["heading-17"]}>{currentText}</Text>
      <XStack alignItems="center">
        {button("prev")}
        {button("next")}
      </XStack>
    </XStack>
  );
};

export default Header;
