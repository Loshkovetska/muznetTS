import { CalendarActionKind } from "@/lib/constants/date-picker";
import type { Dayjs } from "dayjs";

export type DateType = string | number | Dayjs | Date | null | undefined;

export type LocalState = {
  date: DateType;
  currentDate: DateType;
  currentYear: number;
  horizontal: boolean;
};

export type CalendarAction = {
  type: CalendarActionKind;
  payload: any;
};

export interface IDayObject {
  text: string;
  day: number;
  date: string;
  disabled: boolean;
  isCurrentMonth: boolean;
  dayOfMonth?: number;
  inRange: boolean;
  leftCrop: boolean;
  rightCrop: boolean;
}

export type SingleChange = (params: { date: DateType }) => void;

export interface DatePickerBaseProps {
  locale?: string | ILocale;
  startYear?: number;
  endYear?: number;
  minDate?: DateType;
  maxDate?: DateType;
  disabledDates?: DateType[] | ((date: DateType) => boolean);
  firstDayOfWeek?: number;
  displayFullDays?: boolean;
  date?: DateType;
  markedDates?: Dayjs[];
  onChange?: (params: { date: DateType }) => void;
}

export type DaysGridItemType =
  | (Omit<IDayObject, "day"> & {
      isToday: boolean;
      isSelected: boolean;
      isMarked: boolean;
    })
  | null;

export type DatePickerListPropType = {
  daysGrid: Array<DaysGridItemType>;
  getItem: (day: any, index: number) => React.ReactNode;
};
