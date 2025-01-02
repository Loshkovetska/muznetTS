import { Text } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { AlertCircle } from "@tamagui/lucide-icons";
import { XStack, XStackProps } from "tamagui";

export default function InfoMessage({
  text,
  textColor = "dim-gray",
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
        typo="reg-14"
        color={textColor as "error"}
        width="91%"
      >
        {text}
      </Text>
    </XStack>
  );
}
