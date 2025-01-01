import Button from "@/components/ui/button";
import { colors, typography } from "@/tamagui.config";
import { Text, YStack } from "tamagui";

export default function AuthSocialItem({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <YStack
      gap={5}
      alignItems="center"
    >
      <Button
        variant="outlined"
        sizeB="social"
      >
        {icon}
      </Button>
      <Text
        {...typography["medium-17"]}
        textAlign="center"
        color={colors["black"]}
      >
        {title}
      </Text>
    </YStack>
  );
}
