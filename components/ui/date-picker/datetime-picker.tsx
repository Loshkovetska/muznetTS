import Calendar from "@/components/ui/date-picker/calendar";
import { CalendarActionKind } from "@/lib/constants/date-picker";
import {
  CalendarAction,
  CalendarThemeProps,
  DatePickerBaseProps,
  DateType,
  HeaderProps,
  LocalState,
  SingleChange,
} from "@/lib/types/date";
import { getDate, getFormated, getStartOfDay } from "@/lib/utils/date-picker";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { memo, useCallback, useEffect, useReducer } from "react";
import CalendarContext from "./calendar-context";

dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export interface DatePickerSingleProps
  extends CalendarThemeProps,
    HeaderProps,
    DatePickerBaseProps {
  date?: DateType;
  markedDates?: Dayjs[];
  onChange?: SingleChange;
}

const DateTimePicker = (props: DatePickerSingleProps) => {
  const {
    locale = "en",
    displayFullDays = false,
    timePicker = false,
    firstDayOfWeek,
    buttonPrevIcon,
    buttonNextIcon,
    minDate,
    maxDate,
    disabledDates,
    date,
    startDate,
    endDate,
    dates,
    onChange,
    markedDates,
    ...rest
  } = props;

  dayjs.locale(locale);

  const initialCalendarView = "day";

  const firstDay =
    firstDayOfWeek && firstDayOfWeek > 0 && firstDayOfWeek <= 6
      ? firstDayOfWeek
      : 0;

  let currentDate = dayjs();

  if (date) {
    currentDate = dayjs(date);
  }

  if (minDate && currentDate.isBefore(minDate)) {
    currentDate = dayjs(minDate);
  }

  let currentYear = currentDate.year();

  const [state, dispatch] = useReducer(
    (prevState: LocalState, action: CalendarAction) => {
      switch (action.type) {
        case CalendarActionKind.SET_CALENDAR_VIEW:
          return {
            ...prevState,
            calendarView: action.payload,
          };
        case CalendarActionKind.CHANGE_CURRENT_DATE:
          return {
            ...prevState,
            currentDate: action.payload,
          };
        case CalendarActionKind.CHANGE_CURRENT_YEAR:
          return {
            ...prevState,
            currentYear: action.payload,
          };
        case CalendarActionKind.CHANGE_SELECTED_DATE:
          const { date } = action.payload;
          return {
            ...prevState,
            date,
            currentDate: date,
          };
        case CalendarActionKind.CHANGE_SELECTED_RANGE:
          const { startDate, endDate } = action.payload;
          return {
            ...prevState,
            startDate,
            endDate,
          };
        case CalendarActionKind.CHANGE_SELECTED_MULTIPLE:
          const { dates } = action.payload;
          return {
            ...prevState,
            dates,
          };
      }
    },
    {
      date,
      startDate,
      endDate,
      dates,
      calendarView: initialCalendarView,
      currentDate,
      currentYear,
    }
  );

  useEffect(() => {
    const newDate =
      (date && (timePicker ? date : getStartOfDay(date))) ?? minDate;

    dispatch({
      type: CalendarActionKind.CHANGE_SELECTED_DATE,
      payload: { date: newDate },
    });
  }, [date, startDate, endDate, dates, minDate, timePicker]);

  const onSelectDate = useCallback(
    (date: DateType) => {
      if (onChange) {
        const newDate = getStartOfDay(date);

        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_DATE,
          payload: newDate,
        });

        (onChange as SingleChange)({
          date: newDate,
        });
      }
    },
    [onChange, state.startDate, state.endDate, state.dates]
  );

  const onSelectMonth = useCallback(
    (month: number) => {
      const newDate = getDate(state.currentDate).month(month);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: "day",
      });
    },
    [state.currentDate]
  );

  const onSelectYear = useCallback(
    (year: number) => {
      const newDate = getDate(state.currentDate).year(year);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: "day",
      });
    },
    [state.currentDate]
  );

  const onChangeMonth = useCallback(
    (month: number) => {
      const newDate = getDate(state.currentDate).add(month, "month");
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
    },
    [state.currentDate]
  );

  const onChangeYear = useCallback((year: number) => {
    dispatch({
      type: CalendarActionKind.CHANGE_CURRENT_YEAR,
      payload: year,
    });
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        locale,
        displayFullDays,
        timePicker,
        minDate,
        maxDate,
        disabledDates,
        firstDayOfWeek: firstDay,
        theme: rest,
        markedDates,
        onSelectDate,
        onSelectMonth,
        onSelectYear,
        onChangeMonth,
        onChangeYear,
      }}
    >
      <Calendar
        buttonPrevIcon={<ChevronLeft />}
        buttonNextIcon={<ChevronRight />}
      />
    </CalendarContext.Provider>
  );
};

export default memo(DateTimePicker);
