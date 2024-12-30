import { AdType, FiltersType, UserType } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

class SearchServiceClass {
  constructor() {}

  async search(params: FiltersType): Promise<Array<UserType | AdType>> {
    try {
      let request;

      const isMusician = params.user_type === "musician";

      if (isMusician) {
        request = supabase.from("users").select().eq("user_type", "musician");
      }

      if (params.willing_to_travel) {
        request = request?.eq("willing_to_travel", params.willing_to_travel);
      }

      if (!isMusician) {
        request = supabase.from("ads").select();
      }

      if (params.q) {
        if (isMusician) {
          request = request?.or(
            `name.like.%${params.q}%,surname.like.%${params.q}%`
          );
        }
        if (!isMusician) {
          request = request?.like("title", `%${params.q}%`);
        }
      }

      if (params.position && isMusician) {
        request = request?.eq("position", params.position);
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

      if (params.sing_by_ear) {
        request = request?.eq("sing_by_ear", params.sing_by_ear);
      }

      if (params.play_by_ear) {
        request = request?.eq("play_by_ear", params.play_by_ear);
      }

      if (params.read_sheet_music) {
        request = request?.eq("read_sheet_music", params.read_sheet_music);
      }

      request = request
        ?.gte("price_per_hour", params.price_range.min)
        ?.lte("price_per_hour", params.price_range.max);

      if (params.sort_by) {
        switch (params.sort_by) {
          case "rating":
            request = request?.order("rate->rate", { ascending: false });
            break;
          case "price_asc":
            request = request?.order("price_per_hour", { ascending: true });
            break;
          case "price_desc":
            request = request?.order("price_per_hour", { ascending: false });
            break;
        }
      }

      const response = await request;

      if (response?.data) return response.data;
      throw new Error("Something went wrong");
    } catch (e) {
      console.log(e);
    }
    return [];
  }
}

const SearchService = new SearchServiceClass();

export { SearchService };
