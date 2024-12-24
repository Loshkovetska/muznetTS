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

export type { FiltersType };
