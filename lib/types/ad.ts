import { LocationType } from "@/lib/types/common";
import { UserType } from "@/lib/types/user";

type AdType = {
  id: string;
  title: string;
  description: string;
  address: string;
  coordinates: LocationType;
  date: string;
  images: string[];
  price_per_hour: number;
  musician_type: "Singer" | "Band" | "Musician" | "Anyone";
  musical_instruments: string[];
  creator: UserType;
  rate: {
    rate: number;
    totalReviews: number;
  };
};

export type { AdType };
