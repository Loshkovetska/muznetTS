import { colors, typography } from "@/tamagui.config";
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
      "black/50": {
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      "white/50": {
        backgroundColor: "rgba(256,256,256,0.5)",
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
} & GetProps<typeof ButtonStyled> &
  React.PropsWithChildren;

export default function Button(props: ButtonPropType) {
  const { children, loading, iconLeft, iconRight, variant, ...rest } = props;
  return (
    <ButtonStyled
      variant={variant}
      {...rest}
    >
      {loading && <Spinner size="small" />}
      {iconLeft}
      <ButtonTextStyled
        sizeB={props.sizeB as "sm"}
        variant={variant}
        unstyled
      >
        {children}
      </ButtonTextStyled>
      {iconRight}
    </ButtonStyled>
  );
}
