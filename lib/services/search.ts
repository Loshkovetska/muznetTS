import { AdType, FiltersType, UserType } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

class SearchServiceClass {
  constructor() {}

  async search(params: FiltersType): Promise<Array<UserType | AdType>> {
    try {
      let request;

      if (params.user_type === "musician") {
        request = supabase
          .from("users")
          .select()
          .eq("user_type", "musician")
          .eq("willing_to_travel", params.willing_to_travel);
      }

      if (params.user_type === "contractor") {
        request = supabase.from("ads").select();
      }

      if (params.location) {
        request = request?.like("address", `%${params.location}%`);
      }

      if (params.musical_genres.length) {
        request = request?.contains("musical_genres", params.musical_genres);
      }

      if (params.musical_instruments.length) {
        request = request?.contains(
          "musical_instruments",
          params.musical_instruments
        );
      }

      request = request?.in("price_per_hour", [
        params.price_range.min,
        params.price_range.min,
      ]);

      if (params.sort_by) {
        switch (params.sort_by) {
          case "rating":
            request = request?.order("rate->rate", { ascending: false });
          case "price_acs":
            request = request?.order("price_per_hour", { ascending: true });
          case "price_desc":
            request = request?.order("price_per_hour", { ascending: false });
        }
      }

      const response = await request;
      if (response?.data) return response.data;
      throw new Error("Something went wrong");
    } catch (e) {
      //   console.log(e);
    }
    return [];
  }
}

const SearchService = new SearchServiceClass();

export default SearchService;
