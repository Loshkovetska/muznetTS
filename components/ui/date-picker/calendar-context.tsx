import { DatePickerBaseProps, DateType } from "@/lib/types/date";
import { createContext, useContext } from "react";

export interface CalendarContextType extends DatePickerBaseProps {
  locale: string | ILocale;
  displayFullDays: boolean;
  firstDayOfWeek: number;
  currentDate: DateType;
  currentYear: number;
  horizontal?: boolean;
  onSelectDate: (date: DateType) => void;
  onChangeMonth: (value: number) => void;
  onViewChange: (hz: boolean) => void;
}

const CalendarContext = createContext({} as CalendarContextType);

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarContext;
