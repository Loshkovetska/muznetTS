import { createContext, useCallback, useContext, useState } from "react";
import { ScrollView } from "react-native";

type SelectContextType = {
  isOpen: boolean;
  options: string[];
  name: string;
  ref: ScrollView | null;
  position: { x: number; y: number };
  setOpen: (fl: boolean) => void;
  setOptions: (opts: string[]) => void;
  setName: (v: string) => void;
  setPosition: (args: { x: number; y: number }) => void;
};

const SelectContext = createContext<SelectContextType>({
  isOpen: false,
  options: [],
  name: "",
  ref: null,
  position: { x: 0, y: 0 },
  setOpen: (fl: boolean) => {},
  setOptions: (opts: string[]) => {},
  setName: (v: string) => {},
  setPosition: (args: { x: number; y: number }) => {},
});

export const useSelectContext = () => useContext(SelectContext);

export default function SelectProvider(
  props: React.PropsWithChildren & {
    scrollRef: ScrollView | null;
    coords: { x: number; y: number };
  }
) {
  const { children, coords, scrollRef } = props;
  const [options, setOptions] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [selectName, setName] = useState("");
  const [triggerPosition, setPosition] = useState({ x: 16, y: 0 });

  const onPositionChange = useCallback(
    (pos: { x: number; y: number }) => {
      setPosition({ x: pos.x + coords.x, y: coords.y + pos.y });
    },
    [coords]
  );

  return (
    <SelectContext.Provider
      value={{
        options,
        isOpen,
        name: selectName,
        ref: scrollRef,
        position: triggerPosition,
        setPosition: onPositionChange,
        setOpen,
        setOptions,
        setName,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}
