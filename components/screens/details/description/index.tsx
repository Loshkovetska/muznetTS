import { colors, typography } from "@/tamagui.config";
import { useState } from "react";
import { Text, YStack } from "tamagui";

export default function DetailsDescription({ text }: { text: string }) {
  const [showMore, setShow] = useState(false);
  return (
    <YStack gap={8}>
      <Text
        {...typography["paragraph-17"]}
        color={colors["disabled"]}
        numberOfLines={showMore ? undefined : 6}
      >
        {text}
      </Text>
      <Text
        textDecorationLine="underline"
        onPress={() => setShow((prev) => !prev)}
        {...typography["heading-15"]}
      >
        Show {showMore ? "less" : "more"}
      </Text>
    </YStack>
  );
}
