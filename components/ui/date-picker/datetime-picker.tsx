import Calendar from "@/components/ui/date-picker/calendar";
import { CalendarActionKind } from "@/lib/constants/date-picker";
import {
  CalendarAction,
  DatePickerBaseProps,
  DateType,
  LocalState,
  SingleChange,
} from "@/lib/types/date";
import { getDate, getFormated, getStartOfDay } from "@/lib/utils/date-picker";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import CalendarContext from "./calendar-context";

dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export interface DatePickerSingleProps extends DatePickerBaseProps {
  date?: DateType;
  markedDates?: Dayjs[];
  subBlock?: boolean;
  horizontal: boolean;
  resize?: boolean;
  onChange?: SingleChange;
}

const DateTimePicker = (props: DatePickerSingleProps) => {
  const {
    locale = "en",
    displayFullDays = false,
    firstDayOfWeek,
    minDate,
    maxDate,
    disabledDates,
    date,
    subBlock,
    markedDates,
    horizontal,
    resize,
    onChange,
  } = props;

  dayjs.locale(locale);

  const firstDay = useMemo(
    () =>
      firstDayOfWeek && firstDayOfWeek > 0 && firstDayOfWeek <= 6
        ? firstDayOfWeek
        : 0,
    [firstDayOfWeek]
  );

  const { currentDate, currentYear } = useMemo(() => {
    const currentDate =
      minDate && dayjs(date).isBefore(minDate) ? dayjs(minDate) : dayjs(date);
    return {
      currentDate,
      currentYear: currentDate.year(),
    };
  }, [date, minDate]);

  const [state, dispatch] = useReducer(
    (prevState: LocalState, action: CalendarAction) => {
      switch (action.type) {
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
        case CalendarActionKind.CHANGE_VIEW:
          return {
            ...prevState,
            horizontal: action.payload,
          };
        case CalendarActionKind.CHANGE_SELECTED_DATE:
          const { date } = action.payload;
          return {
            ...prevState,
            date,
            currentDate: date,
          };
      }
    },
    {
      date,
      currentDate,
      currentYear,
      horizontal,
    }
  );

  useEffect(() => {
    const newDate = (date && getStartOfDay(date)) ?? minDate;

    dispatch({
      type: CalendarActionKind.CHANGE_SELECTED_DATE,
      payload: { date: newDate },
    });
  }, [date, minDate]);

  const onSelectDate = useCallback(
    (date: DateType) => {
      if (onChange) {
        const newDate = getStartOfDay(date);

        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_DATE,
          payload: newDate,
        });

        onChange({
          date: newDate,
        });
      }
    },
    [dispatch, onChange]
  );

  const onChangeMonth = useCallback(
    (month: number) => {
      const newDate = getDate(state.currentDate).add(month, "month");
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
    },
    [state.currentDate, dispatch]
  );

  const onViewChange = useCallback(
    (hz: boolean) => {
      dispatch({
        type: CalendarActionKind.CHANGE_VIEW,
        payload: hz,
      });
    },
    [dispatch]
  );

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        locale,
        displayFullDays,
        minDate,
        maxDate,
        disabledDates,
        firstDayOfWeek: firstDay,
        markedDates,
        onSelectDate,
        onChangeMonth,
        onViewChange,
      }}
    >
      <Calendar
        resize={resize}
        subBlock={subBlock}
      />
    </CalendarContext.Provider>
  );
};

export default memo(DateTimePicker);
