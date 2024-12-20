import dayjs from "dayjs";
import { UseFormReturn } from "react-hook-form";

const DAY_IN_MILLISECONDS = 86400000;
export const getReviewDate = (created_at: string) => {
  const today = dayjs();
  const date = dayjs(created_at);
  const diff = today.diff(date);
  const countDiffDays = Math.floor(diff / DAY_IN_MILLISECONDS);

  if (countDiffDays === 0) return "Today";
  if (countDiffDays === 1) return "One day ago";
  return date.format("DD MMM YYYY");
};

export const generateImagesList = (images: string[]): string | null => {
  return images?.[0] || null;
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
