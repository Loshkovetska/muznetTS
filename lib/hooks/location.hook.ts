import { PredictionType } from "@/lib/types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "tamagui";

export function useLocations(defaultValue?: string) {
  const [value, setValue] = useState("");
  const [list, setList] = useState<PredictionType[]>([]);

  const findAvailableLocations = useCallback(
    debounce(async (value: string) => {
      const API_KEY = process.env.EXPO_PUBLIC_MAP_APIKEY;
      const GOOGLE_PACES_API_URL = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        value
      )}&apiKey=${API_KEY}`;
      const response = await axios.get(GOOGLE_PACES_API_URL);
      if (response.data) {
        setList(response.data.features);
      }
    }, 300),
    []
  );

  const onInputChange = useCallback(
    (value: string) => {
      setValue(value);
      findAvailableLocations(value);
    },
    [findAvailableLocations]
  );

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  return { value, list, setValue, setList, onInputChange };
}
