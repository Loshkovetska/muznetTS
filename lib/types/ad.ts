import { ReviewType } from "@/lib/types/review";

type AdType = {
  id: number;
  adImage: string;
  userPricePerHour: number;
  userCurrencyType: string;
  adDescription: string;
  adTitle: string;
  adLocation: string;
  adReview: ReviewType[];
};

export type { AdType };
