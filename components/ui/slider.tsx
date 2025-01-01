import { SCREEN_WIDTH } from "@/lib/constants";
import useSlider from "@/lib/hooks/slider.hook";
import { colors } from "@/tamagui.config";
import React, { useCallback } from "react";
import { Stack, XStack, styled } from "tamagui";

const Thumb = styled(XStack, {
  height: 2,
  backgroundColor: colors["light-gray"],
  width: "100%",
  variants: {
    selected: {
      true: {
        backgroundColor: colors["black"],
      },
    },
  } as const,
});

const ThumbContainer = styled(XStack, {
  width: "100%",
  height: 24,
  alignItems: "center",
  variants: {
    selected: {
      true: {
        position: "absolute",
        top: "50%",
        zIndex: 1,
      },
    },
  } as const,
});

const Track = styled(Stack, {
  width: 24,
  height: 24,
  borderWidth: 2,
  borderColor: colors["black"],
  backgroundColor: colors["main"],
  borderRadius: 12,
  position: "absolute",
  top: "50%",
  transform: [{ translateY: "-50%" }],
  zIndex: 2,
});

type SliderPropType = {
  min: number;
  max: number;
  defaultValues: number[];
  onValueChange: (val: number[]) => void;
} & React.PropsWithChildren;

const SLIDER_WIDTH = SCREEN_WIDTH - 32;

export default function Slider({
  min,
  max,
  defaultValues,
  children,
  onValueChange,
}: SliderPropType) {
  const { thumbWidth, translateX, tracksLocations, onThumbPress, onMoveEnd } =
    useSlider({
      min,
      max,
      defaultValues,
      sliderWidth: SLIDER_WIDTH,
      onValueChange,
    });

  const getTrack = useCallback(
    (translateX: number, type: "min" | "max") => {
      return (
        <Track
          transform={[
            {
              translateX: translateX,
            },
            { translateY: "-50%" },
          ]}
          onResponderEnd={(e) => onMoveEnd(e, type)}
          onMoveShouldSetResponderCapture={() => true}
          onScrollShouldSetResponder={() => true}
          onScrollShouldSetResponderCapture={() => true}
          onMoveShouldSetResponder={() => true}
          onStartShouldSetResponder={() => true}
        />
      );
    },
    [onMoveEnd]
  );
  return (
    <XStack
      position="relative"
      width={SLIDER_WIDTH}
    >
      {children &&
        React.cloneElement(children as any, {
          min: translateX.min,
          max: SLIDER_WIDTH - translateX.max - 12,
        })}
      {getTrack(translateX.min, "min")}
      <ThumbContainer onPress={(e) => onThumbPress(e, 0)}>
        <Thumb />
      </ThumbContainer>
      <ThumbContainer
        selected
        width={thumbWidth}
        transform={[
          { translateY: "-50%" },
          { translateX: tracksLocations.min },
        ]}
        onPress={(e) => onThumbPress(e, tracksLocations.min)}
      >
        <Thumb selected />
      </ThumbContainer>
      {getTrack(translateX.max, "max")}
    </XStack>
  );
}
