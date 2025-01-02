import { useCallback, useEffect, useMemo, useState } from "react";
import { GestureResponderEvent } from "react-native";

type useSliderProps = {
  min: number;
  max: number;
  defaultValues: number[];
  sliderWidth: number;
  onValueChange: (v: number[]) => void;
};

export function useSlider({
  min,
  max,
  defaultValues,
  sliderWidth,
  onValueChange,
}: useSliderProps) {
  const [pos, setPos] = useState({
    min: 0,
    max: 0,
  });

  const onChange = useCallback(
    (locationX: number, type: "min" | "max") => {
      const currentValue = Math.round((locationX * max) / sliderWidth);

      const values =
        type === "min"
          ? [currentValue >= min ? currentValue : 0, defaultValues[1]]
          : [defaultValues[0], currentValue <= max ? currentValue : max];

      onValueChange(values);
    },
    [min, max, defaultValues]
  );

  const onThumbPress = useCallback(
    (
      { nativeEvent: { changedTouches } }: GestureResponderEvent,
      offset: number
    ) => {
      const locationX = changedTouches[0].locationX + offset;
      const currentValue = Math.round((locationX * max) / sliderWidth);
      const minDiff = Math.abs(currentValue - defaultValues[0]);
      const maxDiff = Math.abs(defaultValues[1] - currentValue);

      const type =
        minDiff <= maxDiff ? "min" : minDiff >= maxDiff ? "max" : undefined;

      type && onChange(locationX, type);
    },
    [max, min, defaultValues, onChange]
  );

  const onMoveEnd = useCallback(
    (
      { nativeEvent: { changedTouches } }: GestureResponderEvent,
      type: "min" | "max"
    ) => {
      const currentValue = Math.round(
        (changedTouches[0].locationX * max) / sliderWidth
      );

      const values =
        type === "min"
          ? [
              defaultValues[0] + currentValue >= min
                ? defaultValues[0] + currentValue
                : 0,
              defaultValues[1],
            ]
          : [
              defaultValues[0],
              defaultValues[1] + currentValue <= max
                ? defaultValues[1] + currentValue
                : max,
            ];

      onValueChange(values);
    },
    [onChange]
  );

  const tracksLocations = useMemo(() => {
    return {
      min: (defaultValues[0] * sliderWidth) / max + pos.min,
      max: (defaultValues[1] * sliderWidth) / max + pos.max,
    };
  }, [defaultValues, min, max, pos]);

  const thumbWidth = useMemo(() => {
    const { min, max } = tracksLocations;
    return max - min;
  }, [tracksLocations]);

  const translateX = useMemo(() => {
    return {
      min:
        tracksLocations.min - 12 > 0
          ? tracksLocations.min - 12
          : tracksLocations.min,
      max:
        tracksLocations.max + 12 >= sliderWidth
          ? tracksLocations.max - 24
          : tracksLocations.max - 12,
    };
  }, [tracksLocations]);

  useEffect(() => {
    if (defaultValues[0] === min && defaultValues[1] === max) {
      setPos({ min: 0, max: 0 });
    }
  }, [defaultValues, min, max]);

  return { thumbWidth, translateX, tracksLocations, onMoveEnd, onThumbPress };
}
