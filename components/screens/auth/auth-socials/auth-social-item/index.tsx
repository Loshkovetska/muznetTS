import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { YStack } from "tamagui";

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
        typo="medium-17"
        textAlign="center"
        color="black"
      >
        {title}
      </Text>
    </YStack>
  );
}
