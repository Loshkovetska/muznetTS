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
});

type RadioPropType = {
  value: string;
  id?: string;
} & GetProps<typeof StyleItemRadio>;

export function Radio({ value, id, ...rest }: RadioPropType) {
  return (
    <StyleItemRadio
      value={value}
      id={id}
      {...rest}
    >
      <StyledIndicator>
        <Check
          color={colors["white"]}
          size={14}
        />
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
  backgroundColor: colors["white"],
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
  },
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
        <Text {...typography["label-17"]}>{label}</Text>
      </XStack>
    </RadioGroupItem>
  );
}
