import { colors, typography } from "@/tamagui.config";
import { useState } from "react";
import { Text, YStack } from "tamagui";

export default function DetailsDescription({
  text,
  title,
}: {
  text: string;
  title?: string;
}) {
  const [isVisible, setVisible] = useState(false);
  const [showMore, setShow] = useState(false);
  return (
    <YStack gap={8}>
      {title && <Text {...typography["bold-17"]}>{title}</Text>}
      <Text
        onLayout={({ nativeEvent: { layout } }) =>
          setVisible(layout.height > 44)
        }
        {...typography["reg-17"]}
        color={colors["gray-100"]}
        numberOfLines={showMore ? undefined : 6}
      >
        {text}
      </Text>
      {isVisible && (
        <Text
          textDecorationLine="underline"
          onPress={() => setShow((prev) => !prev)}
          {...typography["bold-15"]}
        >
          Show {showMore ? "less" : "more"}
        </Text>
      )}
    </YStack>
  );
}
