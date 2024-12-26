import { typography } from "@/tamagui.config";
import { AlertCircle } from "@tamagui/lucide-icons";
import { Text, XStack } from "tamagui";

export default function InfoMessage({ text }: { text: string }) {
  return (
    <XStack
      gap={8}
      alignItems="center"
    >
      <AlertCircle color="#B9B9BA" />
      <Text
        {...typography["paragraph-14"]}
        fontSize={13}
        color="#717171"
      >
        {text}
      </Text>
    </XStack>
  );
}
