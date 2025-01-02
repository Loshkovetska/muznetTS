import React, { useCallback, useMemo, useState } from "react";

import DatePickerResize from "@/components/ui/date-picker/date-picker-resize";
import Day from "@/components/ui/date-picker/day";
import DaysHZList from "@/components/ui/date-picker/days-hz-list";
import DaysVerticalList from "@/components/ui/date-picker/days-vertical-list";
import { Text } from "@/components/ui/text";
import { SCREEN_WIDTH } from "@/lib/constants";
import {
  areDatesOnSameDay,
  getClearDate,
  getDate,
  getDaysInMonth,
  getFormated,
  getMonthDays,
  getParsedDate,
  getWeekdaysMin,
} from "@/lib/utils/date-picker";
import { Stack, XStack, YStack, styled } from "tamagui";
import { useCalendarContext } from "./calendar-context";

const Wrapper = styled(Stack, {
  alignItems: "center",
  justifyContent: "center",
});

const DaySelector = ({ resize }: { resize?: boolean }) => {
  const {
    date,
    currentDate,
    displayFullDays,
    minDate,
    maxDate,
    disabledDates,
    firstDayOfWeek,
    markedDates,
    horizontal,
    onSelectDate,
  } = useCalendarContext();

  const [width, setWidth] = useState(SCREEN_WIDTH - 48);

  const { year, month, hour, minute } = useMemo(
    () => getParsedDate(currentDate),
    [currentDate]
  );

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
        const leftCrop = day.dayOfMonth === 1;
        const rightCrop = day.dayOfMonth === fullDaysInMonth;

        const isToday = areDatesOnSameDay(day.date, today);
        const inRange = false;
        const isSelected = areDatesOnSameDay(day.date, date);

        const isMarked = !!markedDates?.find(
          (item) => item.toISOString() === getClearDate(day.date).toISOString()
        );

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
    markedDates,
    currentDate,
  ]);

  const handleSelectDate = useCallback(
    (date: string) => {
      const newDate = getDate(date).hour(hour).minute(minute);
      onSelectDate(getFormated(newDate));
    },
    [hour, minute, onSelectDate]
  );

  const getItem = useCallback(
    (day: any, index: number) => (
      <Wrapper
        key={index}
        width={(width - 33) / 7}
      >
        {day && (
          <Day
            date={day.date}
            text={day.text}
            disabled={day.disabled}
            isCurrentMonth={day.isCurrentMonth}
            isToday={day.isToday}
            isSelected={day.isSelected}
            inRange={day.inRange}
            leftCrop={day.leftCrop}
            rightCrop={day.rightCrop}
            isMarked={day.isMarked}
            onSelectDate={handleSelectDate}
          />
        )}
      </Wrapper>
    ),
    [width, handleSelectDate]
  );

  return (
    <YStack
      flexGrow={1}
      width="100%"
      marginTop={4}
      paddingHorizontal={4}
      onLayout={({ nativeEvent: { layout } }) => setWidth(layout.width)}
    >
      <XStack
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        marginBottom={10}
      >
        {getWeekdaysMin(firstDayOfWeek)?.map((item) => (
          <Wrapper
            key={item}
            width={(width - 28) / 7}
          >
            <Text
              typo="bold-12"
              textTransform="uppercase"
              color="light-p-gray"
              textAlign="center"
              minWidth={35}
              maxWidth={35}
            >
              {item}
            </Text>
          </Wrapper>
        ))}
      </XStack>
      {horizontal && (
        <DaysHZList
          key={month}
          daysGrid={daysGrid}
          getItem={getItem}
        />
      )}
      {!horizontal && (
        <DaysVerticalList
          daysGrid={daysGrid}
          getItem={getItem}
        />
      )}
      {resize && <DatePickerResize />}
    </YStack>
  );
};

export default DaySelector;
