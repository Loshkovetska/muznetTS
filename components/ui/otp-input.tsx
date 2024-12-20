import Input from "@/components/ui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { XStack } from "tamagui";

export default function OTPInput({
  onCodeChange,
}: {
  onCodeChange: (val: string[]) => void;
}) {
  const [code, setCode] = useState<Array<string>>(Array(4).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentRef = useRef<TextInput[]>(Array(4));

  const onChange = useCallback((t: string, id: number) => {
    setCode((prev) => [
      ...prev.slice(0, id),
      t.slice(0, 1),
      ...prev.slice(id + 1),
    ]);
    !!t && id + 1 < 4 && setCurrentIndex(id + 1);
  }, []);

  useEffect(() => {
    currentRef?.current?.[currentIndex]?.focus();
  }, [currentIndex]);

  useEffect(() => {
    const notEmpty = code.some(Boolean);
    notEmpty && onCodeChange(code);
  }, [code, onCodeChange]);

  return (
    <XStack
      gap={8}
      justifyContent="center"
    >
      {Array(4)
        .fill("")
        .map((_, id) => (
          <Input
            ref={(ref) => {
              ref && (currentRef.current[id] = ref);
            }}
            value={code?.[id] || ""}
            keyboardType="numeric"
            onChangeText={(t) => onChange(t, id)}
            sizeB="code"
            key={id}
          />
        ))}
    </XStack>
  );
}
