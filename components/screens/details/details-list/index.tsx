import Separator from "@/components/ui/separator";
import Text from "@/components/ui/text";
import { colors } from "@/tamagui.config";
import { Circle } from "@tamagui/lucide-icons";
import { XStack, YStack } from "tamagui";

type DetailsListPropType = {
  title: string;
  list: string[];
};
export default function DetailsList({ title, list }: DetailsListPropType) {
  return (
    <YStack gap={24}>
      <Separator />
      <YStack gap={16}>
        <Text typo="bold-20">{title}</Text>
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
                typo="reg-17"
                color="gray-100"
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
