import LocationSearchResult from "@/components/location-search/locations-search-result";
import { PredictionType } from "@/lib/types";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ScrollView } from "react-native";
import { debounce } from "tamagui";
type LocationContextType = {
  ref?: ScrollView | null;
  value: string;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  setValue: (v: string) => void;
  setPosition: (args: { x: number; y: number }) => void;
};

type LocationsProviderPropType = {
  defaultValue?: string;
  scrollRef?: ScrollView | null;
  coords: { x: number; y: number };
  mode?: "light" | "dark";
  onValueChange: (val: PredictionType) => void;
} & React.PropsWithChildren;

const LocationContext = createContext<LocationContextType>({
  ref: null,
  value: "",
  isOpen: false,
  setOpen: (v: boolean) => {},
  setValue: (v: string) => {},
  setPosition: (args: { x: number; y: number }) => {},
});

export const useLocationContext = () => useContext(LocationContext);

export default function LocationsProvider(props: LocationsProviderPropType) {
  const { children, coords, scrollRef, mode, defaultValue, onValueChange } =
    props;
  const [value, setValue] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [triggerPosition, setPosition] = useState({ x: 0, y: 0 });
  const [list, setList] = useState<PredictionType[]>([]);

  const onPositionChange = useCallback(
    (pos: { x: number; y: number }) => {
      setPosition({ x: pos.x + coords.x, y: coords.y + pos.y });
    },
    [coords]
  );

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

  return (
    <LocationContext.Provider
      value={{
        isOpen,
        value,
        ref: scrollRef,
        setOpen,
        setValue: onInputChange,
        setPosition: onPositionChange,
      }}
    >
      <LocationSearchResult
        mode={mode}
        results={list}
        isOpen={isOpen}
        position={triggerPosition}
        setOpen={setOpen}
        setValue={setValue}
        onChange={onValueChange}
      />
      {children}
    </LocationContext.Provider>
  );
}
