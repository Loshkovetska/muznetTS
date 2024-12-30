import Label from "@/components/ui/label";
import { useInput } from "@/lib/hooks/input.hook";
import { colors } from "@/tamagui.config";
import { AlertCircle, CircleCheck } from "@tamagui/lucide-icons";
import React from "react";
import { TextInput, View } from "react-native";
import {
  GetProps,
  Input as InputT,
  StackProps,
  XStack,
  YStack,
  styled,
} from "tamagui";

const StyledInputContainer = styled(XStack, {
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  borderWidth: 1,
  borderRadius: 6,
  paddingHorizontal: 16,
  paddingVertical: 10,
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
      search: {
        backgroundColor: colors["search-gray"],
        borderWidth: 0,
      },
      "search-filter": {
        backgroundColor: colors["search-gray"],
        borderWidth: 0,
        paddingVertical: 3,
        paddingRight: 6,
        paddingLeft: 10,
      },
    },
    sizeB: {
      default: { height: 48 },
      s40: { height: 40 },
      code: { height: 72, width: 64 },
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
  width: "100%",
  maxWidth: "80%",
  height: "auto",
  color: colors["black"],
  placeholderTextColor: colors["s-black"],
  outlineWidth: 0,
  backgroundColor: "transparent",
  borderWidth: 0,
  padding: 0,
  fontFamily: "MulishRegular",
});

const StyledInputWrapper = styled(YStack, {
  flexGrow: 1,
  gap: 4,
  height: "100%",
  justifyContent: "center",
});

export type InputPropType = Omit<
  GetProps<typeof StyledInputContainer>,
  "onFocus" | "onBlur"
> &
  GetProps<typeof StyledInput> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    animate?: boolean;
    wrapper?: GetProps<typeof StyledInputContainer> & StackProps;
    getWrapperRef?: (ref: View) => void;
  };

const Input = React.forwardRef<TextInput, InputPropType>(
  (
    {
      iconLeft,
      iconRight,
      disabled,
      variant = "default",
      sizeB = "default",
      animate = true,
      wrapper,
      getWrapperRef,
      ...props
    },
    ref
  ) => {
    const { isFocused, onBlur, onFocus } = useInput({
      onFocus: props.onFocus,
      onBlur: props.onBlur,
    });

    return (
      <StyledInputContainer
        variant={variant}
        sizeB={sizeB}
        focused={variant !== "default" ? false : isFocused}
        justifyContent={sizeB == "code" ? "center" : undefined}
        disabled={disabled}
        paddingRight={iconRight ? 8 : undefined}
        paddingLeft={iconLeft ? 8 : undefined}
        {...wrapper}
        ref={(ref) => {
          ref && getWrapperRef?.(ref as any);
        }}
      >
        {iconLeft}
        <StyledInputWrapper>
          {props.placeholder && animate && isFocused && (
            <Label
              sizeB="sm"
              marginTop={-3}
            >
              {props.placeholder}
            </Label>
          )}
          <StyledInput
            ref={ref}
            {...props}
            onBlur={onBlur}
            onFocus={onFocus}
            fontSize={sizeB === "code" ? 32 : undefined}
            width={sizeB === "code" ? 32 : undefined}
            textAlign={sizeB === "code" ? "center" : undefined}
          />
        </StyledInputWrapper>
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
  }
);

export default Input;
