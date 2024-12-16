import { ReviewType } from "@/lib/types/review";

type UserType = {
  id: number;
  userType: string;
  userNickName: string;
  userAvatar: string;
  userPricePerHour: number;
  userCurrencyType: string;
  userFirstName: string;
  userLastName: string;
  userLocation: string;
  userGenres: string[];
  userReview: ReviewType[];
  userEmail: string;
  userAddress: string;
  userPhoneNumber: string;
  userMusicalInstrument: string[];
  willingToTravel: boolean;
  userSkills: UserSkillsType;
  userNotification: UserNotification;
  userDeals: UserDealsType;
  userMembers: any;
};

type UserDealsType = {
  activeDeals: UserDealType[];
  closedDeals: UserDealType[];
};

type UserSkillsType = {
  singByEar: boolean;
  playByEar: boolean;
  readSheetMusic: boolean;
};

type UserNotification = {
  userNewReview: boolean;
  userNewOffer: boolean;
  userNewMessage: boolean;
  userNewProfileView: boolean;
  userLoginAtteptOnAccount: boolean;
  userTransaction: boolean;
};

type DateType = {
  milliseconds: number;
  string: string;
};

type UserDealType = {
  dealId: number;
  dealUserName: string;
  dealNumber: number;
  dealStatus: boolean;
  userPricePerHour: number;
  userCurrencyType: string;
  adDate: DateType;
  eventStart: DateType;
  eventEnd: DateType;
  adTitle: string;
  adLocation: string;
  dealPhoneNumber: string;
  paymentMethod: string;
  perfomanceCost: number;
  muznetFee: number;
  totalPrice: number;
  moreDetails: string;
};

export type { UserType };
