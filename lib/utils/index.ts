import { ReviewType } from "@/lib/types/review";

export const rateAverageCount = (reviewData: ReviewType[]) => {
  //   if (!reviewData.length) return "0";
  //   const totalRate =
  //     reviewData.reduce((prev, curr) => prev + curr.reviewRate, 0) || 0;
  //   if (totalRate) return (totalRate / reviewData.length).toFixed(1);
  return "0";
};

export const generateImagesList = (images: string | string[]) => {
  if (typeof images !== "string") return images;
  return (
    images
      .trim()
      .split(", ")
      .filter((f) => f.length) || []
  );
};
