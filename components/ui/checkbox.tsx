import Label from "@/components/ui/label";
import { colors } from "@/tamagui.config";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { Checkbox, CheckboxProps, XStack, styled } from "tamagui";

const StyledCheckBox = styled(Checkbox, {
  borderWidth: 1,
  borderColor: colors["gray-20"],
  backgroundColor: colors["main"],
  focusStyle: {
    backgroundColor: colors["main"],
  },
  variants: {
    checked: {
      true: {
        backgroundColor: colors["black"],
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
        {checked && (
          <CheckIcon
            size={16}
            color={colors["main"]}
          />
        )}
      </StyledCheckBox>
      <Label
        htmlFor={id}
        typo="medium-15"
        color={colors["comet"]}
        onPress={() => onCheckedChange?.(!checked)}
      >
        {label}
      </Label>
    </XStack>
  );
}
