import { useSelectContext } from "@/components/providers/select-provider";
import { colors, typography } from "@/tamagui.config";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import React, { useCallback, useEffect, useRef } from "react";
import { FlatList, GestureResponderEvent, View } from "react-native";
import { Text, XStack, styled } from "tamagui";

type SelectPropType = {
  value: string;
  placeholder: string;
  options: string[];
  name: string;
};

const SelectTrigger = styled(XStack, {
  flexDirection: "row",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: colors["default-gray"],
  variants: {
    open: {
      true: {
        borderBottomWidth: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
  },
});

const SelectValue = styled(Text, {
  ...typography["paragraph-17"],
  color: colors["s-black"],
  flexGrow: 1,
});

const StyledSelectContent = styled(XStack, {
  padding: 16,
  position: "absolute",
  top: 48,
  left: 0,
  backgroundColor: colors["white"],
  width: "100%",
  borderInlineWidth: 1,
  borderBlockWidth: 1,
  maxHeight: 200,
  zIndex: 2000,
  borderEndEndRadius: 6,
  borderEndStartRadius: 6,
  borderColor: colors["default-gray"],
  opacity: 0,
  visibility: "hidden",
  variants: {
    open: {
      true: {
        opacity: 1,
        visibility: "visible",
      },
    },
  },
});

const SelectItem = styled(Text, {
  ...typography["paragraph-17"],
  color: colors["black"],
});

export default function Select({
  value,
  placeholder,
  options,
  name,
}: SelectPropType) {
  const triggerRef = useRef<View>(null);
  const { isOpen, ref, setOpen, setOptions, setName, setPosition } =
    useSelectContext();

  const onPress = useCallback(
    (e: GestureResponderEvent) => {
      setOpen(!isOpen);
      if (ref && triggerRef.current) {
        triggerRef.current.measureLayout(ref as any, (x, y, width, height) => {
          setPosition({ x, y: y + height });
        });
      }
    },
    [ref, isOpen, setOpen]
  );

  useEffect(() => {
    setOptions(isOpen ? options : []);
    setName(isOpen ? name : "");
  }, [isOpen, name, options, setOptions, setName]);

  return (
    <SelectTrigger
      open={isOpen}
      onPress={onPress}
      ref={triggerRef}
    >
      <SelectValue>{value || placeholder}</SelectValue>
      {isOpen ? <ChevronUp /> : <ChevronDown />}
    </SelectTrigger>
  );
}

export function SelectContent({
  onValueChange,
}: {
  onValueChange: (name: string, value: string) => void;
}) {
  const { isOpen, options, name, position, setOpen } = useSelectContext();
  const onChange = useCallback(
    (name: string, v: string) => {
      onValueChange(name, v);
      setOpen(false);
    },
    [onValueChange, setOpen]
  );
  return (
    <StyledSelectContent
      open={isOpen}
      top={position.y}
      left={position.x}
    >
      <FlatList
        nestedScrollEnabled
        data={options}
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <SelectItem onPress={() => onChange(name, item)}>{item}</SelectItem>
        )}
        keyExtractor={(item) => item}
      />
    </StyledSelectContent>
  );
}
