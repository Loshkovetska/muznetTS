import { useSelectContext } from "@/components/providers/select-provider";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import { colors, typography } from "@/tamagui.config";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import React, { useCallback, useRef } from "react";
import { FlatList, GestureResponderEvent, View } from "react-native";
import { GetProps, Text, XStack, YStack, styled } from "tamagui";

type SelectPropType = {
  value: string;
  placeholder: string;
  options: string[] | { id: string; title: string }[];
  name: string;
};

const StyledSelectTrigger = styled(XStack, {
  flexDirection: "row",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: colors["default-gray"],
  variants: {
    open: {
      true: {
        borderBottomColor: "transparent",
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
  },
});

const SelectValue = styled(Text, {
  ...typography["reg-17"],
  color: colors["comet"],
  flexGrow: 1,
});

const StyledSelectContent = styled(XStack, {
  padding: 16,
  position: "absolute",
  top: 48,
  left: 0,
  backgroundColor: colors["main"],
  width: "100%",
  borderInlineWidth: 1,
  borderBlockWidth: 1,
  maxHeight: 200,
  zIndex: 200_001,
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
  ...typography["reg-17"],
  color: colors["black"],
});

type SelectTriggerPropType = {
  value: string;
  placeholder: string;
  isOpen: boolean;
  onPress: (e: GestureResponderEvent) => void;
  triggerIcon?: React.ReactNode;
} & GetProps<typeof StyledSelectTrigger>;

export const SelectTrigger = React.forwardRef<View, SelectTriggerPropType>(
  ({ isOpen, value, placeholder, triggerIcon, onPress, ...props }, ref) => {
    return (
      <StyledSelectTrigger
        open={isOpen}
        ref={ref}
        onPress={onPress}
        {...props}
      >
        <SelectValue>{value || placeholder}</SelectValue>
        {triggerIcon || (isOpen ? <ChevronUp /> : <ChevronDown />)}
      </StyledSelectTrigger>
    );
  }
);

export default function Select({
  value,
  placeholder,
  options,
  name,
}: SelectPropType) {
  const triggerRef = useRef<View>(null);
  const { isOpen, ref, setOpen, setOptions, setName, setPosition, ...rest } =
    useSelectContext();

  const onPress = useCallback(
    (e: GestureResponderEvent) => {
      setOpen(!isOpen);
      setName(!isOpen ? name : "");
      setOptions(!isOpen ? options : []);
      if (ref && triggerRef.current) {
        triggerRef.current.measureLayout(ref as any, (x, y, width, height) => {
          setPosition({ x, y: y + height });
        });
      }
    },
    [ref, isOpen, options, setOpen, setName, setOptions]
  );

  return (
    <SelectTrigger
      ref={triggerRef}
      value={value}
      isOpen={rest.name === name ? isOpen : false}
      placeholder={placeholder}
      onPress={onPress}
    />
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
    <>
      <StyledSelectContent
        open={isOpen}
        top={position.y - 1}
        left={position.x}
        width={SCREEN_WIDTH - (position.x || 16) * 2}
      >
        <FlatList
          nestedScrollEnabled
          data={options}
          style={{ width: "100%", zIndex: 1 }}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <SelectItem
              zIndex={2}
              onPress={() =>
                onChange(name, typeof item === "string" ? item : item?.id)
              }
            >
              {typeof item === "string" ? item : item.title}
            </SelectItem>
          )}
          keyExtractor={(item) => (typeof item === "string" ? item : item?.id)}
        />
      </StyledSelectContent>
      <YStack
        position="absolute"
        zIndex={200_000}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        opacity={isOpen ? 1 : 0}
        onPress={() => setOpen(false)}
      />
    </>
  );
}
