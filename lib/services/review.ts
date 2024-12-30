import { AddReviewRequestType, ReviewType } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

class ReviewServiceClass {
  constructor() {}

  async getReviews({
    profile_id,
    ad_id,
  }: {
    profile_id?: string;
    ad_id?: string;
  }): Promise<ReviewType[]> {
    try {
      const request = supabase
        .from("reviews")
        .select("*, user:user_id(name, surname, photo)");
      let response;
      if (profile_id) {
        response = await request.eq("profile_id", profile_id);
      }

      if (ad_id) {
        response = await request.eq("ad_id", ad_id);
      }

      if (!response?.data) throw new Error("No Reviews");
      return response.data;
    } catch (e) {
      console.log(e);
    }
    return [];
  }

  async addReview(body: AddReviewRequestType): Promise<{
    review: ReviewType;
    newRate: { rate: number; totalReviews: number };
  } | null> {
    try {
      const copy = JSON.parse(JSON.stringify(body));
      delete copy.postRate;
      const response = await supabase
        .from("reviews")
        .insert({
          ...copy,
          response: null,
          ad_id: copy.ad_id || null,
          profile_id: copy.profile_id || null,
        })
        .select("*, user:user_id(name, surname, photo)")
        .single();

      if (response.data) {
        const newTotal = body.postRate.totalReviews + 1;

        const newRate = {
          totalReviews: newTotal,
          rate: (body.postRate.rate + body.rate) / newTotal,
        };

        if (body.profile_id) {
          await supabase
            .from("users")
            .update({
              rate: newRate,
            })
            .eq("id", body.profile_id);
        }
        if (body.ad_id) {
          await supabase
            .from("ads")
            .update({
              rate: newRate,
            })
            .eq("id", body.ad_id);
        }

        return {
          review: response.data,
          newRate: newRate,
        };
      }
      throw new Error("Cant add review");
    } catch (e) {
      console.log(e);
    }

    return null;
  }
}

const ReviewService = new ReviewServiceClass();

export { ReviewService };
