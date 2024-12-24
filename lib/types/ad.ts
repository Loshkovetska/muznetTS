import { LocationType } from "@/lib/types/common";
import { UserType } from "@/lib/types/user";

type AdType = {
  id: string;
  deal_number: number;
  title: string;
  description: string;
  address: string;
  location: LocationType;
  start_date: string;
  end_date: string;
  photo: string[];
  price_per_hour: number;
  musical_instruments: string[];
  musical_genres: string[];
  sing_by_ear: boolean;
  play_by_ear: boolean;
  read_sheet_music: boolean;
  creator: UserType;
  status: "active" | "closed";
  rate: {
    rate: number;
    totalReviews: number;
  };
};

type AddUpdateAdRequestType = {
  id?: string;
  user_id?: string;
  title: string;
  description: string;
  address: string;
  start_date: Date;
  end_date: Date;
  price_per_hour: string;
  musical_instruments: string[];
  musical_genres: string[];
  photo: any[];
  sing_by_ear: boolean;
  play_by_ear: boolean;
  read_sheet_music: boolean;
};

export type { AdType, AddUpdateAdRequestType };
