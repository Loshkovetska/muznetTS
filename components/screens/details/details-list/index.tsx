import Separator from "@/components/ui/separator";
import { colors, typography } from "@/tamagui.config";
import { Circle } from "@tamagui/lucide-icons";
import { Text, XStack, YStack } from "tamagui";

type DetailsListPropType = {
  title: string;
  list: string[];
};
export default function DetailsList({ title, list }: DetailsListPropType) {
  return (
    <YStack gap={24}>
      <Separator />
      <YStack gap={16}>
        <Text {...typography["heading-20"]}>{title}</Text>
        <YStack gap={8}>
          {list.map((item) => (
            <XStack
              key={item}
              alignItems="center"
              gap={4}
            >
              <Circle
                size={6}
                fill={colors["black"]}
              />
              <Text
                {...typography["paragraph-17"]}
                color={colors["disabled"]}
              >
                {item}
              </Text>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </YStack>
  );
}
