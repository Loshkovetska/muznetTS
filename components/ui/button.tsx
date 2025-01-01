import { colors, typography } from "@/tamagui.config";
import React from "react";
import { GetProps, Spinner, Button as TButton, Text, styled } from "tamagui";

const ButtonTextStyled = styled(Text, {
  color: colors["white"],
  variants: {
    sizeB: {
      sm: typography["label-13"],
      sm14: typography["label-14"],
      sm15: typography["heading-15"],
      lg: typography["label-16"],
      sm17: typography["paragraph-17"],
    },
    variant: {
      default: { color: colors["black"] },
      dark: { color: colors["white"] },
      white: { color: colors["black"] },
      "black/50": { color: colors["white"] },
      "white/50": { color: colors["black"] },
      outlined: { color: colors["black"] },
      transparent: { color: colors["black"] },
      secondary: { color: colors["black"] },
      "red-outlined": { color: colors["error"] },
    },
  } as const,
  defaultVariants: {
    sizeB: "sm",
  },
});
const ButtonStyled = styled(TButton, {
  gap: 8,
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  variants: {
    sizeB: {
      sm: {
        width: "auto",
        height: 32,
        borderRadius: 6,
      },
      sm17: {
        width: "auto",
        height: "auto",
      },
      sm15: {
        width: "auto",
        height: 32,
        borderRadius: 6,
      },
      lg: {
        width: "100%",
        height: 56,
        borderRadius: 12,
      },
      social: {
        width: 60,
        height: 60,
      },
      icon: {
        width: 48,
        height: 48,
        borderRadius: 24,
      },
      "icon-sm": {
        width: 24,
        height: 24,
        borderRadius: 6,
      },
      "icon-filter": {
        width: 28,
        height: 28,
      },
      "icon-32": {
        width: 32,
        height: 32,
        borderRadius: 6,
      },
    },
    variant: {
      transparent: {
        backgroundColor: "transparent",
        borderWidth: 0,
        focusStyle: {
          backgroundColor: "transparent",
          borderWidth: 0,
        },
        hoverStyle: { backgroundColor: "transparent", borderWidth: 0 },
        pressStyle: { backgroundColor: "transparent", borderWidth: 0 },
      },
      default: {
        backgroundColor: colors["gray"],
      },
      dark: {
        backgroundColor: colors["black"],
      },
      white: {
        backgroundColor: colors["white"],
        borderWidth: 1,
        borderColor: colors["black"],
      },
      secondary: {
        backgroundColor: "#F2F3F9",
      },
      "black/50": {
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      "white/50": {
        backgroundColor: "rgba(256,256,256,0.5)",
      },
      "red-outlined": {
        backgroundColor: colors["white"],
        borderWidth: 1,
        borderColor: colors["error"],
      },
    },
    disabled: {
      true: {
        backgroundColor: colors["gray"],
        pointerEvents: "none",
        color: colors["disabled"],
      },
    },
  } as const,
  defaultVariants: {
    variant: "default",
    sizeB: "sm",
  },
});

type ButtonPropType = {
  loading?: boolean;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  textProps?: GetProps<typeof ButtonTextStyled>;
} & GetProps<typeof ButtonStyled> &
  React.PropsWithChildren;

const Button = React.forwardRef<any, ButtonPropType>(
  (props: ButtonPropType, ref) => {
    const {
      children,
      loading,
      iconLeft,
      iconRight,
      variant,
      textProps,
      ...rest
    } = props;
    return (
      <ButtonStyled
        ref={ref}
        variant={variant}
        pointerEvents={loading ? "none" : "auto"}
        gap={iconLeft ? 0 : 8}
        {...rest}
      >
        {loading && <Spinner size="small" />}
        {iconLeft}
        <ButtonTextStyled
          sizeB={props.sizeB as "sm"}
          variant={variant}
          unstyled
          {...textProps}
        >
          {children}
        </ButtonTextStyled>
        {iconRight}
      </ButtonStyled>
    );
  }
);

export default Button;
