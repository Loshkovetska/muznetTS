type ReviewType = {
  id: string;
  rate: number;
  created_at: string;
  user: {
    photo: string;
    name: string;
    surname: string;
  };
  text: string;
  response?: string;
  ad_id?: string;
  profile_id?: string;
};

type AddReviewRequestType = {
  rate: number;
  text: string;
  user_id: string;
  profile_id?: string;
  ad_id?: string;
  postRate: { rate: number; totalReviews: number };
};
export type { AddReviewRequestType, ReviewType };
