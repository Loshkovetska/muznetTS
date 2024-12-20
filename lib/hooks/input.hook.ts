import { useCallback, useState } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

type InputEventType = NativeSyntheticEvent<TextInputFocusEventData>;

type useInputPropType = {
  onFocus?: (e: InputEventType) => void;
  onBlur?: (e: InputEventType) => void;
};

export const useInput = ({ onFocus, onBlur }: useInputPropType) => {
  const [isFocused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (e: InputEventType) => {
      onFocus?.(e);
      setFocused(true);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: InputEventType) => {
      onBlur?.(e);
      setFocused(false);
    },
    [onBlur]
  );

  return { isFocused, onFocus: handleFocus, onBlur: handleBlur };
};
