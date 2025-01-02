import { Text } from "@/components/ui";
import { UserType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { User } from "@tamagui/lucide-icons";
import { XStack } from "tamagui";

export default function ProfileUser({
  user,
}: {
  user: Partial<UserType> | null;
}) {
  return (
    <XStack
      gap={5}
      alignItems="center"
    >
      <User
        size={16}
        color={colors["comet"]}
      />
      <Text typo="reg-17">
        {user?.name} {user?.surname}
      </Text>
    </XStack>
  );
}
