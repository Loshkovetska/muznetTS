import { colors, typography } from "@/tamagui.config";
import { GetProps, Spinner, Button as TButton, Text, styled } from "tamagui";

const ButtonTextStyled = styled(Text, {
  color: colors["white"],
  variants: {
    size: {
      sm: typography["label-13"],
      sm14: typography["label-14"],
      lg: typography["label-20"],
    },
  } as const,
  defaultVariants: {
    size: "sm",
  },
});
const ButtonStyled = styled(TButton, {
  gap: 8,
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  variants: {
    size: {
      sm: {
        width: "auto",
        height: 32,
        borderRadius: 6,
      },
      lg: {
        width: "100%",
        height: 56,
        borderRadius: 12,
      },
    },
    variant: {
      default: {
        backgroundColor: colors["gray"],
      },
      dark: {
        backgroundColor: colors["black"],
      },
      disabled: {
        opacity: 0.5,
        pointerEvents: "none",
      },
    },
  } as const,
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

type ButtonPropType = {
  loading?: boolean;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
} & GetProps<typeof ButtonStyled> &
  React.PropsWithChildren;

export default function Button(props: ButtonPropType) {
  const { children, loading, iconLeft, iconRight, ...rest } = props;
  return (
    <ButtonStyled {...rest}>
      {loading && <Spinner size="small" />}
      {iconLeft}
      <ButtonTextStyled
        size={props.size as "sm"}
        unstyled
      >
        {children}
      </ButtonTextStyled>
      {iconRight}
    </ButtonStyled>
  );
}
