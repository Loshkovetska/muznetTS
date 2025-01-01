import { colors, typography } from "@/tamagui.config";
import { Check } from "@tamagui/lucide-icons";
import { GetProps, Label, RadioGroup, Text, XStack, styled } from "tamagui";

const StyleItemRadio = styled(RadioGroup.Item, {
  unstyled: true,
  width: 20,
  height: 20,
  borderRadius: 10,
  borderColor: colors["default-gray"],
  borderWidth: 1,
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  variants: {
    dark: {
      true: {
        borderWidth: 0,
      },
    },
  } as const,
});

const StyledIndicator = styled(RadioGroup.Indicator, {
  unstyled: true,
  position: "absolute",
  left: 0,
  top: 0,
  backgroundColor: colors["black"],
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",

  variants: {
    dark: {
      true: {
        position: "relative",
        width: 10,
        height: 10,
        borderRadius: 10,
      },
    },
  } as const,
});

type RadioPropType = {
  value: string;
  id?: string;
  dark?: boolean;
} & GetProps<typeof StyleItemRadio>;

export function Radio({ value, id, dark, ...rest }: RadioPropType) {
  return (
    <StyleItemRadio
      value={value}
      id={id}
      dark={dark}
      {...rest}
    >
      <StyledIndicator dark={dark}>
        {!dark && (
          <Check
            color={colors["main"]}
            size={14}
          />
        )}
      </StyledIndicator>
    </StyleItemRadio>
  );
}

const StyledRadioGroupItem = styled(Label, {
  unstyled: true,
  borderRadius: 12,
  borderColor: colors["default-gray"],
  borderWidth: 1,
  flexGrow: 1 / 2,
  backgroundColor: colors["main"],
  alignItems: "center",
  gap: 8,
  padding: 16,
  position: "relative",
  justifyContent: "center",
  variants: {
    selected: {
      true: {
        borderWidth: 2,
        borderColor: colors["black"],
      },
    },
  } as const,
});

type RadioGroupItemPropType = GetProps<typeof StyledRadioGroupItem>;

export function RadioGroupItem(props: RadioGroupItemPropType) {
  return <StyledRadioGroupItem {...props} />;
}

type RadioGroupItemWithLabelPropType = RadioGroupItemPropType & {
  label: string;
  value: string;
  id: string;
};

export function RadioGroupItemWithLabel({
  label,
  value,
  id,
  ...rest
}: RadioGroupItemWithLabelPropType) {
  return (
    <RadioGroupItem
      htmlFor={id}
      {...rest}
    >
      <XStack
        gap={12}
        alignItems="center"
      >
        <Radio
          value={value}
          id={id}
        />
        <Text {...typography["medium-17"]}>{label}</Text>
      </XStack>
    </RadioGroupItem>
  );
}
