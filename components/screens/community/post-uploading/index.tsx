import { Text } from "@/components/ui";
import { toggleToast } from "@/lib/utils/toast";
import { colors } from "@/tamagui.config";
import { useEffect, useRef, useState } from "react";
import { Spinner, XStack } from "tamagui";

export default function PostUploading({
  isLoading,
  onFinish,
}: {
  isLoading: boolean;
  onFinish: () => void;
}) {
  const interval = useRef<any>();
  const [percentages, setPercentages] = useState(0);

  useEffect(() => {
    if (isLoading) {
      interval.current = setInterval(() => {
        setPercentages((prev) => (prev + 5 > 100 ? 500 : prev + 5));
      }, 100);
    }
  }, [isLoading]);

  useEffect(() => {
    if (percentages === 100) {
      toggleToast("Post successfully added.", "success");
      clearInterval(interval.current);
      onFinish();
    }
  }, [percentages, onFinish]);
  return (
    <XStack
      paddingHorizontal={16}
      paddingVertical={8}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text typo="reg-17">Post is loading</Text>
      <XStack
        alignItems="center"
        gap={10}
      >
        <Text typo="bold-14">{percentages}%</Text>
        <Spinner color={colors["black"]} />
      </XStack>
    </XStack>
  );
}
