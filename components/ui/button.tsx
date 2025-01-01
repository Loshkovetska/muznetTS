import { colors, typography } from "@/tamagui.config";
import React from "react";
import { GetProps, Spinner, Button as TButton, Text, styled } from "tamagui";

const ButtonTextStyled = styled(Text, {
  color: colors["main"],
  variants: {
    sizeB: {
      sm: typography["medium-13"],
      sm14: typography["medium-14"],
      sm15: typography["bold-15"],
      lg: typography["medium-16"],
      sm17: typography["reg-17"],
    },
    variant: {
      default: { color: colors["black"] },
      dark: { color: colors["main"] },
      white: { color: colors["black"] },
      "black/50": { color: colors["main"] },
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
        backgroundColor: colors["ghost"],
      },
      dark: {
        backgroundColor: colors["black"],
      },
      white: {
        backgroundColor: colors["main"],
        borderWidth: 1,
        borderColor: colors["black"],
      },
      secondary: {
        backgroundColor: colors["ghost-white"],
      },
      "black/50": {
        backgroundColor: colors["black-50"],
      },
      "white/50": {
        backgroundColor: colors["white-50"],
      },
      "red-outlined": {
        backgroundColor: colors["main"],
        borderWidth: 1,
        borderColor: colors["error"],
      },
    },
    disabled: {
      true: {
        backgroundColor: colors["ghost"],
        pointerEvents: "none",
        color: colors["gray-100"],
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
