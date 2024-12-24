import {
  CalendarThemeProps,
  DatePickerBaseProps,
  DateType,
} from "@/lib/types/date";
import { createContext, useContext } from "react";

export interface CalendarContextType extends DatePickerBaseProps {
  locale: string | ILocale;
  displayFullDays: boolean;
  firstDayOfWeek: number;
  theme: CalendarThemeProps;
  currentDate: DateType; // used for latest state of calendar based on Month and Year
  currentYear: number;
  onSelectDate: (date: DateType) => void;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
  onChangeMonth: (value: number) => void;
  onChangeYear: (value: number) => void;
}

const CalendarContext = createContext({} as CalendarContextType);

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarContext;
