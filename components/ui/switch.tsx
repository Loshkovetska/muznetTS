import { Label } from "@/components/ui/label";
import { colors } from "@/tamagui.config";
import { Switch, XStack, styled } from "tamagui";

type SwitchWithLabelPropType = {
  checked: boolean;
  name: string;
  label: string;
  onCheckedChange: (v: boolean) => void;
};

const StyledSwitch = styled(Switch, {
  unstyled: true,
  backgroundColor: colors["gray-10"],
  alignItems: "center",
  height: 24,
  width: 40,
  maxHeight: 24,
  minHeight: 24,
  padding: 2,
  borderWidth: 0,

  variants: {
    checked: {
      true: {
        backgroundColor: colors["black"],
      },
    },
  },
});

const StyledSwitchThumb = styled(Switch.Thumb, {
  unstyled: true,
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: colors["main"],
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowRadius: 4,
  shadowColor: colors["black-6"],
});

export function SwitchWithLabel(props: SwitchWithLabelPropType) {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
    >
      <Label
        typo="medium-17"
        minWidth={90}
        htmlFor={props.name}
      >
        {props.label}
      </Label>
      <StyledSwitch
        unstyled
        id={props.name}
        checked={props.checked}
        onCheckedChange={props.onCheckedChange}
      >
        <StyledSwitchThumb
          unstyled
          animation="fast"
        />
      </StyledSwitch>
    </XStack>
  );
}
