import { DateType, IDayObject } from "@/lib/types/date";
import dayjs from "dayjs";

export const CALENDAR_FORMAT = "YYYY-MM-DD HH:mm";
export const DATE_FORMAT = "YYYY-MM-DD";
export const YEAR_PAGE_SIZE = 12;

export const getMonths = () => dayjs.months();

export const getMonthName = (month: number) => dayjs.months()[month];

export const getWeekdays = () => dayjs.weekdays();

export const getWeekdaysShort = () => dayjs.weekdaysShort();

export const getWeekdaysMin = (firstDayOfWeek: number) => {
  let days = dayjs.weekdaysShort();
  if (firstDayOfWeek > 0) {
    days = [
      ...days.slice(firstDayOfWeek, days.length),
      ...days.slice(0, firstDayOfWeek),
    ] as dayjs.WeekdayNames;
  }
  return days;
};

export const getFormated = (date: DateType) =>
  dayjs(date).format(CALENDAR_FORMAT);

export const getDateMonth = (date: DateType) => dayjs(date).month();

export const getDateYear = (date: DateType) => dayjs(date).year();

export const getToday = () => dayjs().format(DATE_FORMAT);

export function areDatesOnSameDay(a: DateType, b: DateType) {
  if (!a || !b) {
    return false;
  }

  const date_a = dayjs(a).format(DATE_FORMAT);
  const date_b = dayjs(b).format(DATE_FORMAT);

  return date_a === date_b;
}

export function isDateDisabled(
  date: dayjs.Dayjs,
  {
    minDate,
    maxDate,
    disabledDates,
  }: {
    minDate?: DateType;
    maxDate?: DateType;
    disabledDates?: DateType[] | ((date: DateType) => boolean) | undefined;
  }
): boolean {
  if (minDate && date < getDate(minDate)) return true;
  if (maxDate && date > getDate(maxDate)) return true;

  if (disabledDates) {
    if (Array.isArray(disabledDates)) {
      const isDisabled = disabledDates.some((disabledDate) =>
        areDatesOnSameDay(date, disabledDate)
      );
      return isDisabled;
    } else if (disabledDates instanceof Function) {
      return disabledDates(date);
    }
  }

  return false;
}

export const getFormatedDate = (date: DateType, format: string) =>
  dayjs(date).format(format);

export const getDate = (date: DateType) => dayjs(date, DATE_FORMAT);

export function getDaysInMonth(
  date: DateType,
  displayFullDays: boolean | undefined,
  firstDayOfWeek: number
) {
  const daysInCurrentMonth = dayjs(date).daysInMonth();

  const prevMonthDays = dayjs(date).add(-1, "month").daysInMonth();
  const firstDay = dayjs(date).date(1 - firstDayOfWeek);
  const prevMonthOffset = firstDay.day() % 7;
  const daysInPrevMonth = displayFullDays ? prevMonthOffset : 0;
  const monthDaysOffset = prevMonthOffset + daysInCurrentMonth;
  const daysInNextMonth = displayFullDays
    ? monthDaysOffset > 35
      ? 42 - monthDaysOffset
      : 35 - monthDaysOffset
    : 0;

  const fullDaysInMonth =
    daysInPrevMonth + daysInCurrentMonth + daysInNextMonth;

  return {
    prevMonthDays,
    prevMonthOffset,
    daysInCurrentMonth,
    daysInNextMonth,
    fullDaysInMonth,
  };
}

export function getStartOfDay(date: DateType): DateType {
  return dayjs(date).startOf("day");
}

/**
 * Get detailed date object
 *
 * @param date Get detailed date object
 *
 * @returns parsed date object
 */
export const getParsedDate = (date: DateType) => {
  return {
    year: dayjs(date).year(),
    month: dayjs(date).month(),
    hour: dayjs(date).hour(),
    minute: dayjs(date).minute(),
  };
};

/**
 * Calculate month days array based on current date
 *
 * @param datetime - The current date that selected
 * @param displayFullDays
 * @param minDate - min selectable date
 * @param maxDate - max selectable date
 * @param disabledDates - array of disabled dates, or a function that returns true for a given date
 * @param firstDayOfWeek - first day of week, number 0-6, 0 – Sunday, 6 – Saturday
 *
 * @returns days array based on current date
 */
export const getMonthDays = (
  datetime: DateType = dayjs(),
  displayFullDays: boolean,
  minDate: DateType,
  maxDate: DateType,
  firstDayOfWeek: number,
  disabledDates: DateType[] | ((date: DateType) => boolean) | undefined
): IDayObject[] => {
  const date = getDate(datetime);
  const {
    prevMonthDays,
    prevMonthOffset,
    daysInCurrentMonth,
    daysInNextMonth,
  } = getDaysInMonth(datetime, displayFullDays, firstDayOfWeek);

  const prevDays = displayFullDays
    ? Array.from({ length: prevMonthOffset }, (_, index) => {
        const day = index + (prevMonthDays - prevMonthOffset + 1);
        const thisDay = date.add(-1, "month").date(day);
        return generateDayObject(
          day,
          thisDay,
          minDate,
          maxDate,
          disabledDates,
          false,
          index + 1
        );
      })
    : Array(prevMonthOffset).fill(null);

  const currentDays = Array.from({ length: daysInCurrentMonth }, (_, index) => {
    const day = index + 1;
    const thisDay = date.date(day);
    return generateDayObject(
      day,
      thisDay,
      minDate,
      maxDate,
      disabledDates,
      true,
      prevMonthOffset + day
    );
  });

  const nextDays = Array.from({ length: daysInNextMonth }, (_, index) => {
    const day = index + 1;
    const thisDay = date.add(1, "month").date(day);
    return generateDayObject(
      day,
      thisDay,
      minDate,
      maxDate,
      disabledDates,
      false,
      daysInCurrentMonth + prevMonthOffset + day
    );
  });

  return [...prevDays, ...currentDays, ...nextDays];
};

/**
 * Generate day object for displaying inside day cell
 *
 * @param day - number of day
 * @param date - calculated date based on day, month, and year
 * @param minDate - min selectable date
 * @param maxDate - max selectable date
 * @param disabledDates - array of disabled dates, or a function that returns true for a given date
 * @param isCurrentMonth - define the day is in the current month
 *
 * @returns days object based on current date
 */
const generateDayObject = (
  day: number,
  date: dayjs.Dayjs,
  minDate: DateType,
  maxDate: DateType,
  disabledDates: DateType[] | ((date: DateType) => boolean) | undefined,
  isCurrentMonth: boolean,
  dayOfMonth: number
) => {
  return {
    text: day.toString(),
    day: day,
    date: getFormatedDate(date, DATE_FORMAT),
    disabled: isDateDisabled(date, { minDate, maxDate, disabledDates }),
    isCurrentMonth,
    dayOfMonth,
  };
};

export function getClearDate(date: string | Date) {
  return dayjs(date)
    .set("hours", 0)
    .set("minutes", 0)
    .set("seconds", 0)
    .set("milliseconds", 0);
}
