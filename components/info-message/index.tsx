import { colors, typography } from "@/tamagui.config";
import { AlertCircle } from "@tamagui/lucide-icons";
import { Text, XStack, XStackProps } from "tamagui";

export default function InfoMessage({
  text,
  textColor = colors["dim-gray"],
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
        color={colors["gray-80"]}
      />
      <Text
        {...typography["reg-14"]}
        color={textColor}
        width="91%"
      >
        {text}
      </Text>
    </XStack>
  );
}
