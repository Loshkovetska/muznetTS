import { Text } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { Pencil } from "@tamagui/lucide-icons";
import { XStack } from "tamagui";

export default function DialogEmptyMessage() {
  return (
    <XStack
      alignItems="center"
      gap={2}
    >
      <Pencil
        size={14}
        color={colors["third"]}
      />
      <Text
        typo="reg-12"
        color="gray-100"
      >
        writing...
      </Text>
    </XStack>
  );
}
