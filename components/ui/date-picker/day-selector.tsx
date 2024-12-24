import dayjs from "dayjs";
import React, { useCallback, useMemo } from "react";

import Day, { EmptyDay } from "@/components/ui/date-picker/day";
import {
  areDatesOnSameDay,
  getDate,
  getDaysInMonth,
  getFormated,
  getMonthDays,
  getParsedDate,
  getWeekdaysMin,
} from "@/lib/utils/date-picker";
import { typography } from "@/tamagui.config";
import { Text, XStack, YStack } from "tamagui";
import { useCalendarContext } from "./calendar-context";

const DaySelector = () => {
  const {
    date,
    startDate,
    endDate,
    dates,
    currentDate,
    displayFullDays,
    minDate,
    maxDate,
    disabledDates,
    firstDayOfWeek,
    theme,
    markedDates,
    onSelectDate,
  } = useCalendarContext();

  const { year, month, hour, minute } = getParsedDate(currentDate);

  const daysGrid = useMemo(() => {
    const today = new Date();

    const { fullDaysInMonth } = getDaysInMonth(
      currentDate,
      displayFullDays,
      firstDayOfWeek
    );

    return getMonthDays(
      currentDate,
      displayFullDays,
      minDate,
      maxDate,
      firstDayOfWeek,
      disabledDates
    ).map((day) => {
      if (day) {
        let leftCrop = day.dayOfMonth === 1;
        let rightCrop = day.dayOfMonth === fullDaysInMonth;

        const isToday = areDatesOnSameDay(day.date, today);
        let inRange = false;
        let isSelected = areDatesOnSameDay(day.date, date);

        const isMarked = markedDates?.includes(dayjs(day.date));

        return {
          ...day,
          isToday,
          isSelected,
          inRange,
          leftCrop,
          rightCrop,
          isMarked,
        };
      }
      return null;
    });
  }, [
    month,
    year,
    displayFullDays,
    firstDayOfWeek,
    minDate,
    maxDate,
    disabledDates,
    date,
    startDate,
    endDate,
    dates,
    markedDates,
  ]);

  const handleSelectDate = useCallback(
    (date: string) => {
      const newDate = getDate(date).hour(hour).minute(minute);

      onSelectDate(getFormated(newDate));
    },
    [onSelectDate, hour, minute]
  );

  return (
    <YStack
      flexGrow={1}
      width="100%"
    >
      <XStack
        alignItems="center"
        justifyContent="center"
        gap={12}
      >
        {getWeekdaysMin(firstDayOfWeek)?.map((item, index) => (
          <Text
            key={item}
            {...typography["paragraph-12"]}
            fontFamily="MulishBold"
            textTransform="uppercase"
            color="rgba(60,60,67,0.3)"
            textAlign="center"
            minWidth={35}
            maxWidth={35}
          >
            {item}
          </Text>
        ))}
      </XStack>
      <XStack
        flexWrap="wrap"
        gap={12}
        maxWidth={317}
        width="100%"
      >
        {daysGrid?.map((day, index) => {
          return day ? (
            <Day
              key={index}
              date={day.date}
              text={day.text}
              disabled={day.disabled}
              isCurrentMonth={day.isCurrentMonth}
              theme={theme}
              isToday={day.isToday}
              isSelected={day.isSelected}
              inRange={day.inRange}
              leftCrop={day.leftCrop}
              rightCrop={day.rightCrop}
              isMarked={day.isMarked || false}
              onSelectDate={handleSelectDate}
            />
          ) : (
            <EmptyDay key={index} />
          );
        })}
      </XStack>
    </YStack>
  );
};

export default DaySelector;
