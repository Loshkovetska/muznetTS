import { typography } from "@/tamagui.config";
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
        color={"#333333"}
      />
      <Text
        {...typography["paragraph-12"]}
        color="#5C6574"
      >
        writing...
      </Text>
    </XStack>
  );
}
