import { typography } from "@/tamagui.config";
import { AlertCircle } from "@tamagui/lucide-icons";
import { Text, XStack, XStackProps } from "tamagui";

export default function InfoMessage({
  text,
  textColor = "#717171",
  ...props
}: { text: string; textColor?: string } & XStackProps) {
  return (
    <XStack
      gap={8}
      alignItems="center"
      {...props}
    >
      <AlertCircle
        size={20}
        color="rgba(92, 101, 116, 0.8)"
      />
      <Text
        {...typography["paragraph-14"]}
        color={textColor}
        width="91%"
      >
        {text}
      </Text>
    </XStack>
  );
}
