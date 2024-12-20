import Label from "@/components/ui/label";
import { colors, typography } from "@/tamagui.config";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { Checkbox, CheckboxProps, XStack, styled } from "tamagui";

const StyledCheckBox = styled(Checkbox, {
  borderWidth: 1,
  borderColor: colors["gray-20"],
  backgroundColor: colors["white"],
  focusStyle: {
    backgroundColor: colors["white"],
  },
  variants: {
    checked: {
      true: {
        backgroundColor: colors["white"],
      },
    },
  },
});

export default function CheckboxWithLabel({
  label,
  id,
  marginBlock,
  checked,
  onCheckedChange,
}: Omit<CheckboxProps, "inset" | "marginBlock"> & {
  label: string;
  marginBlock?: number;
}) {
  return (
    <XStack
      width={300}
      alignItems="center"
      gap={8}
      marginBlock={marginBlock}
    >
      <StyledCheckBox
        id={id}
        checked={checked as boolean}
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </StyledCheckBox>
      <Label
        {...typography["label-15"]}
        color={colors["s-black"]}
      >
        {label}
      </Label>
    </XStack>
  );
}
