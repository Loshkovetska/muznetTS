import { AdType } from "@/lib/types";
import { DealType } from "@/lib/types/deal";
import dayjs, { Dayjs } from "dayjs";
import { UseFormReturn } from "react-hook-form";

const DAY_IN_MILLISECONDS = 86400000;
const MINUTE_IN_MILLISECONDS = 60000;

export const getReviewDate = (created_at: string) => {
  const today = dayjs();
  const date = dayjs(created_at);
  const diff = today.diff(date);
  const countDiffDays = Math.floor(diff / DAY_IN_MILLISECONDS);

  if (countDiffDays === 0) return "Today";
  if (countDiffDays === 1) return "One day ago";
  return date.format("DD MMM YYYY");
};

export const getTimePeriod = (start: Dayjs, end: Dayjs) => {
  const minutes = Math.round(end.diff(start) / MINUTE_IN_MILLISECONDS);
  const countHours = Math.floor(minutes / 60);
  return {
    output: `(${countHours}h ${minutes % 60}m)`,
    num: minutes / 60,
  };
};

export const getPeriod = (
  start: string,
  end: string,
  time = false,
  withPeriod = true
) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const startTime = startDate.format("HH:mma");
  const endTime = endDate.format("HH:mma");

  const datePeriod = `${startDate.format("HH:mm")}-${endDate.format("HH:mma")}`;

  if (!withPeriod) {
    return datePeriod;
  }

  if (time) {
    return `${datePeriod} ${getTimePeriod(startDate, endDate).output}`;
  }

  const oneDay = startDate.date() === endDate.date();
  if (oneDay) {
    return `${startDate.format("DD MMM")}, ${startTime} to ${endTime}`;
  }
  return `${startDate.format("DD MMM")}, ${startTime} to ${endDate.format(
    "DD MMM"
  )}, ${endTime}`;
};

export const setValueToForm = (
  form: UseFormReturn<any>,
  name: string,
  value: any
) => {
  form.setValue(name, value, {
    shouldDirty: true,
    shouldTouch: true,
    shouldValidate: true,
  });
};

export const getDealTotalPrice = (ad: AdType) => {
  const timeWithCost = getTimePeriod(dayjs(ad.start_date), dayjs(ad.end_date));
  const cost = timeWithCost.num * ad.price_per_hour;
  return { cost, timeWithCost };
};

export const generateDealList = (ad: AdType, status?: DealType["status"]) => {
  const { cost, timeWithCost } = getDealTotalPrice(ad);
  return {
    ...(status
      ? { Status: `${status?.[0].toUpperCase()}${status?.slice(1)}` }
      : {}),
    Date: `${dayjs(ad.start_date).toDate().toLocaleDateString("en-En", {
      weekday: "long",
    })}, ${dayjs(ad.start_date).format("DD MMM YYYY")}`,
    Time: getPeriod(ad.start_date, ad.end_date, true, true),
    Location: ad.address,
    Price: `$${ad.price_per_hour} per hour`,
    "Performance Cost": `$${cost} ${timeWithCost.output}`,
    "Muznet Fee": "$9",
    Total: `$${cost + 9}`,
  };
};

export const generateShortDealList = (deal: DealType) => {
  const { ad } = deal;

  return {
    Date: `${dayjs(ad.start_date).toDate().toLocaleDateString("en-En", {
      weekday: "long",
    })}, ${dayjs(ad.start_date).format("DD MMM YYYY")}`,
    Time: getPeriod(ad.start_date, ad.end_date, true, false),
    Location: ad.address,
    Price: `$${ad.price_per_hour} per hour`,
    "Additional info": ad.description,
  };
};

export const formateDate = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const limitedValue = cleaned.trim().replaceAll("/", "");
  const year = limitedValue.slice(0, 4);
  const month = limitedValue.slice(4, 6);
  const day = limitedValue.slice(6, 8);

  return limitedValue.length > 1 ? `${year}/${month}/${day}` : limitedValue;
};

export const formateTime = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const limitedValue = cleaned.trim().replaceAll(":", "");
  const hours = limitedValue.slice(0, 2);
  const minutes = limitedValue.slice(2, 4);

  return limitedValue.length > 1
    ? `${Number(hours) > 23 ? 23 : hours}:${
        Number(minutes) > 59 ? 59 : minutes
      }`
    : limitedValue;
};

export const is2HoursBetweenDates = (startDate: Date, endDate: Date) => {
  const diff = getTimePeriod(dayjs(startDate), dayjs(endDate)).num;
  return diff > 0 && diff <= 2;
};

export const detectFileType = (fileName: string) => {
  const isImage = /\.(gif|jpg|jpeg|tiff|png|HEIC)$/i.test(fileName);
  const isVideo = /\.(MOV|mp4)$/i.test(fileName);
  const isFile = !isImage && !isVideo;
  return { isImage, isVideo, isFile };
};
