type FiltersType = {
  sort_by: "rating" | "price_asc" | "price_desc" | undefined;
  musical_genres: string[];
  musical_instruments: string[];
  location: string;
  willing_to_travel: boolean;
  price_range: {
    min: number;
    max: number;
  };
  user_type: "musician" | "contractor";
  sing_by_ear: boolean;
  play_by_ear: boolean;
  read_sheet_music: boolean;
  date?: Date;
  position?: "singer" | "band" | "musician" | undefined;
  q?: string;
};

type PredictionType = {
  type: string;
  properties: {
    datasource: {
      sourcename: string;
      attribution: string;
      license: string;
      url: string;
    };
    country: string;
    country_code: string;
    state: string;
    county: string;
    city: string;
    municipality: string;
    village: string;
    lon: number;
    lat: number;
    result_type: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    category: string;
    timezone: {
      name: string;
      offset_STD: string;
      offset_STD_seconds: number;
      offset_DST: string;
      offset_DST_seconds: number;
    };
    plus_code: string;
    rank: {
      importance: number;
      popularity: number;
      confidence: number;
      confidence_city_level: number;
      match_type: string;
    };
    place_id: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
  bbox: number[];
};

export type { FiltersType, PredictionType };
