import { colors } from "@/tamagui.config";
import { BlurView } from "expo-blur";
import { Fragment } from "react";
import { Stack, XStack, styled } from "tamagui";

const StyledIndicatorBlock = styled(XStack, {
  marginTop: 16,
  marginBottom: 20,
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  variants: {
    absolute: {
      true: {
        position: "absolute",
        left: "50%",
        transform: [{ translateX: "-50%" }],
        bottom: 14,
      },
    },
    lightCirle: {
      true: {
        backgroundColor: colors["white-20"],
        padding: 8,
        borderRadius: 90,
        bottom: 16,
        margin: 0,
        gap: 6,
      },
    },
  } as const,
});

const IndicatorThumb = styled(Stack, {
  height: 6,
  width: 20,
  borderRadius: 3,
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 10,
});

const IndicatorItem = styled(Stack, {
  height: 6,
  width: 6,
  borderRadius: 3,
  variants: {
    lightCirle: {
      true: {
        width: 8,
        height: 8,
        borderRadius: 4,
      },
    },
  } as const,
});

type IndicatorBlockPropType = {
  list: any[];
  variant?: "light" | "dark" | "light-circle";
  currentIndex: number;
  absolute?: boolean;
};

export default function IndicatorBlock({
  list,
  variant = "dark",
  currentIndex = 0,
  absolute,
}: IndicatorBlockPropType) {
  const isLightCircleVariant = variant === "light-circle";

  const indicators = isLightCircleVariant ? list : [...list, null];

  const Container = isLightCircleVariant ? BlurView : Fragment;
  return (
    <Container
      {...(isLightCircleVariant
        ? { intensity: 100, blurReductionFactor: 10, tint: "light" }
        : {})}
    >
      <StyledIndicatorBlock
        absolute={absolute}
        lightCirle={isLightCircleVariant}
      >
        {!isLightCircleVariant && (
          <IndicatorThumb
            left={currentIndex * 14}
            backgroundColor={colors[variant === "light" ? "main" : "black"]}
          />
        )}
        {indicators.map((key, index) => {
          const bgColor =
            isLightCircleVariant && index !== currentIndex
              ? "main"
              : isLightCircleVariant && index === currentIndex
              ? "black"
              : variant === "dark"
              ? "ghost"
              : "main-70";

          return (
            <IndicatorItem
              key={key}
              lightCirle={isLightCircleVariant}
              backgroundColor={colors[bgColor as "ghost"]}
            />
          );
        })}
      </StyledIndicatorBlock>
    </Container>
  );
}
