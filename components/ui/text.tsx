import { colors, typography } from "@/tamagui.config";
import React from "react";
import { GetProps, Text as TText, TamaguiTextElement } from "tamagui";

type TextPropType = Omit<GetProps<typeof TText>, "color"> & {
  typo?: keyof typeof typography;
  color?: keyof typeof colors;
};

export const Text = React.forwardRef<TamaguiTextElement, TextPropType>(
  ({ color = "black", typo = "reg-14", ...props }, ref) => {
    return (
      <TText
        ref={ref}
        {...props}
        {...typography[typo]}
        color={colors[color]}
      />
    );
  }
);
