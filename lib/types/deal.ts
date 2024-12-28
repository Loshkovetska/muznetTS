import { AdType } from "@/lib/types/ad";
import { UserType } from "@/lib/types/user";

type DealType = {
  id: string;
  ad: AdType;
  performer: Partial<UserType>;
  deal_num: number;
  offer_status: "waiting" | "accepted" | "declined";
  status: "active" | "closed";
};

type AddDealRequestType = {
  ads_id: string;
  performer: string;
};

export type { AddDealRequestType, DealType };
