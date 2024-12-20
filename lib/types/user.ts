import { LocationType } from "@/lib/types/common";

type CommonUserType = {
  email: string;
  sing_by_ear: boolean;
  play_by_ear: boolean;
  read_sheet_music: boolean;
  musical_instruments: string[];
  musical_genres: string[];
  description: string;
  willing_to_travel: boolean;
  address: string;
  group_members: string[];
  price_per_hour: number;
  name: string;
  surname: string;
  user_type: "contractor" | "musician";
};

type UserType = {
  id: string;
  password: string;
  user_name: string;
  photo: string[] | null;
  position: string;
  location: LocationType;
  rate: {
    rate: number;
    totalReviews: number;
  };
} & CommonUserType;

type SignInRequestType = {
  email: string;
  password: string;
};

type SignUpRequestType = {
  photo: any;
  password: string;
  user_name: string;
  position: string;
} & CommonUserType;

type UpdateInfoType = {
  id: string;
  old_photo: string[];
  photo: any[];
} & Omit<CommonUserType, "user_type">;

type UpdatePasswordRequestType = {
  id: string;
  new_password: string;
};

export type {
  SignInRequestType,
  SignUpRequestType,
  UpdateInfoType,
  UpdatePasswordRequestType,
  UserType,
};
