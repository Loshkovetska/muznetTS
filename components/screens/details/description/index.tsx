import { Text } from "@/components/ui";
import { useState } from "react";
import { YStack } from "tamagui";

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
      {title && <Text typo="bold-17">{title}</Text>}
      <Text
        typo="reg-17"
        color="gray-100"
        numberOfLines={showMore ? undefined : 6}
        onLayout={({ nativeEvent: { layout } }) =>
          setVisible(layout.height > 44)
        }
      >
        {text}
      </Text>
      {isVisible && (
        <Text
          typo="bold-15"
          textDecorationLine="underline"
          onPress={() => setShow((prev) => !prev)}
        >
          Show {showMore ? "less" : "more"}
        </Text>
      )}
    </YStack>
  );
}
