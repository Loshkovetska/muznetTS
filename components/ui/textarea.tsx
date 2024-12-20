import Label from "@/components/ui/label";
import { useInput } from "@/lib/hooks/input.hook";
import { colors } from "@/tamagui.config";
import { AlertCircle, CircleCheck } from "@tamagui/lucide-icons";
import { GetProps, TextArea as InputT, XStack, YStack, styled } from "tamagui";

const StyledInputContainer = styled(XStack, {
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 3,
  borderWidth: 1,
  borderRadius: 6,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderColor: colors["light-gray"],
  variants: {
    variant: {
      default: {
        borderColor: colors["light-gray"],
      },
      error: {
        borderColor: colors["error"],
        borderWidth: 2,
      },
      success: {
        borderColor: colors["success"],
        borderWidth: 2,
      },
    },
    sizeB: {
      default: { height: 72 },
    },
    focused: {
      true: {
        borderColor: colors["s-black"],
      },
    },
    disabled: {
      true: {
        backgroundColor: colors["light-gray"],
        pointerEvents: "none",
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
    sizeB: "default",
  },
});

const StyledInput = styled(InputT, {
  height: "100%",
  color: colors["black"],
  placeholderTextColor: colors["s-black"],
  outlineWidth: 0,
  backgroundColor: "transparent",
  borderWidth: 0,
  padding: 0,
});

type InputPropType = GetProps<typeof StyledInputContainer> &
  GetProps<typeof StyledInput> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

const TextArea = ({
  iconLeft,
  iconRight,
  variant = "default",
  sizeB = "default",
  placeholder,
  disabled,
  ...props
}: InputPropType) => {
  const { isFocused, onBlur, onFocus } = useInput({
    onBlur: props.onBlur,
    onFocus: props.onFocus,
  });
  return (
    <StyledInputContainer
      variant={variant}
      sizeB={sizeB}
      focused={variant !== "default" ? false : isFocused}
      disabled={disabled}
    >
      {iconLeft}
      <YStack
        height="100%"
        flexGrow={1}
      >
        {placeholder && isFocused && <Label sizeB="sm">{placeholder}</Label>}
        <StyledInput
          {...props}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </YStack>
      {iconRight}
      {variant === "error" && (
        <AlertCircle
          color={colors["error"]}
          size={20}
        />
      )}
      {variant === "success" && (
        <CircleCheck
          color={colors["white"]}
          fill={colors["success"]}
          size={20}
        />
      )}
    </StyledInputContainer>
  );
};

export default TextArea;
