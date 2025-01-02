import { Label } from "@/components/ui/label";
import { useInput } from "@/lib/hooks";
import { colors } from "@/tamagui.config";
import { AlertCircle, CircleCheck } from "@tamagui/lucide-icons";
import React from "react";
import { TextInput } from "react-native";
import {
  GetProps,
  TextArea as InputT,
  StackProps,
  XStack,
  YStack,
  styled,
} from "tamagui";

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
        borderColor: colors["comet"],
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
  placeholderTextColor: colors["comet"],
  outlineWidth: 0,
  backgroundColor: "transparent",
  borderWidth: 0,
  padding: 0,
});

type InputPropType = GetProps<typeof StyledInputContainer> &
  GetProps<typeof StyledInput> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    animate?: boolean;
    wrapper?: GetProps<typeof StyledInputContainer> & StackProps;
  };

export const TextArea = React.forwardRef<TextInput, InputPropType>(
  (
    {
      iconLeft,
      iconRight,
      variant = "default",
      sizeB = "default",
      placeholder,
      disabled,
      wrapper,
      animate = true,
      ...props
    },
    ref
  ) => {
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
        {...wrapper}
      >
        {iconLeft}
        <YStack
          height="100%"
          flexGrow={1}
        >
          {placeholder && isFocused && animate && (
            <Label typo="medium-10">{placeholder}</Label>
          )}
          <StyledInput
            ref={ref}
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
            color={colors["main"]}
            fill={colors["success"]}
            size={20}
          />
        )}
      </StyledInputContainer>
    );
  }
);
