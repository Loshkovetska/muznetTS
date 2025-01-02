import LocationSearchResult from "@/components/location-search/locations-search-result";
import { useLocations } from "@/lib/hooks";
import { PredictionType } from "@/lib/types";
import { createContext, useCallback, useContext, useState } from "react";
import { ScrollView } from "react-native";
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
  const [isOpen, setOpen] = useState(false);
  const [triggerPosition, setPosition] = useState({ x: 0, y: 0 });
  const { value, list, onInputChange, setValue } = useLocations(defaultValue);

  const onPositionChange = useCallback(
    (pos: { x: number; y: number }) => {
      setPosition({ x: pos.x + coords.x, y: coords.y + pos.y });
    },
    [coords]
  );

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
