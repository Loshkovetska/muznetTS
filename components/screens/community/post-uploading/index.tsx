import { toggleToast } from "@/lib/utils/toast";
import { colors, typography } from "@/tamagui.config";
import { useEffect, useRef, useState } from "react";
import { Spinner, Text, XStack } from "tamagui";

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
      <Text {...typography["paragraph-17"]}>Post is loading</Text>
      <XStack
        alignItems="center"
        gap={10}
      >
        <Text {...typography["heading-14"]}>{percentages}%</Text>
        <Spinner color={colors["black"]} />
      </XStack>
    </XStack>
  );
}
