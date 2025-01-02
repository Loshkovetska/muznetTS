import { useLocationContext } from "@/components/providers/locations-provider";
import { Button, Input } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { Settings2 } from "@tamagui/lucide-icons";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { StackProps } from "tamagui";

type LocationSearchPropType = {
  placeholder?: string;
  iconLeft?: React.ReactNode;
  variant?: "search-filter" | "default" | "error" | "sucess";
  onFilter?: () => void;
} & StackProps;

export default function LocationSearch({
  placeholder,
  iconLeft,
  variant = "search-filter",
  onFilter,
  ...rest
}: LocationSearchPropType) {
  const { value, isOpen, ref, setValue, setOpen, setPosition } =
    useLocationContext();

  const [triggerRef, setRef] = useState<View | null>(null);

  const onPress = useCallback(() => {
    setOpen(true);
    if (ref && triggerRef) {
      triggerRef.measureLayout(ref as any, (x, y, _, height) => {
        setPosition({ x, y: y + height });
      });
    }
  }, [ref, triggerRef, setPosition, setOpen]);

  return (
    <Input
      wrapper={
        {
          ...rest,
          borderBottomLeftRadius: isOpen ? 0 : undefined,
          borderBottomRightRadius: isOpen ? 0 : undefined,
          onLayout: ({ nativeEvent: { layout } }: any) =>
            setPosition({ x: layout.x, y: layout.y + layout.height }),
        } as any
      }
      animate={variant !== "search-filter"}
      variant={variant as "default"}
      sizeB={variant !== "search-filter" ? undefined : "s40"}
      placeholder={placeholder || "Search"}
      value={value}
      iconLeft={iconLeft}
      onPress={onPress}
      getWrapperRef={(ref) => setRef(ref)}
      iconRight={
        onFilter ? (
          <Button
            variant="dark"
            sizeB="icon-filter"
            onPress={onFilter}
          >
            <Settings2
              color={colors["main"]}
              size={18}
            />
          </Button>
        ) : undefined
      }
      onChangeText={setValue}
    />
  );
}
