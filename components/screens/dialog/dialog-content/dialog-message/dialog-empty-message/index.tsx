import { colors, typography } from "@/tamagui.config";
import { Pencil } from "@tamagui/lucide-icons";
import { Text, XStack } from "tamagui";

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
        {...typography["reg-12"]}
        color={colors["gray-100"]}
      >
        writing...
      </Text>
    </XStack>
  );
}
