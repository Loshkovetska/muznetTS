import { colors, typography } from "@/tamagui.config";
import { GetProps, Text as TText } from "tamagui";

type TextPropType = Omit<GetProps<typeof TText>, "color"> & {
  typo?: keyof typeof typography;
  color?: keyof typeof colors;
};

export function Text({
  color = "black",
  typo = "reg-14",
  ...props
}: TextPropType) {
  return (
    <TText
      {...props}
      {...typography[typo]}
      color={colors[color]}
    />
  );
}
