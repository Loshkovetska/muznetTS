import AuthSocialItem from "@/components/screens/auth/auth-socials/auth-social-item";
import { Separator, Text } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { Apple, Facebook, Mail } from "@tamagui/lucide-icons";
import { XStack, YStack } from "tamagui";

export default function AuthSocial() {
  return (
    <YStack
      gap={32}
      marginTop={40}
      width="100%"
    >
      <XStack
        alignItems="center"
        gap={12}
      >
        <Separator />
        <Text
          typo="medium-20"
          color="secondary"
        >
          OR
        </Text>
        <Separator />
      </XStack>
      <XStack
        gap={32}
        alignItems="center"
        justifyContent="center"
      >
        <AuthSocialItem
          icon={
            <Mail
              color={colors["main"]}
              fill={colors["black"]}
            />
          }
          title="Google"
        />
        <AuthSocialItem
          icon={
            <Facebook
              fill={colors["fb"]}
              color={colors["fb"]}
            />
          }
          title="Facebook"
        />
        <AuthSocialItem
          icon={<Apple fill={colors["black"]} />}
          title="Apple"
        />
      </XStack>
    </YStack>
  );
}
