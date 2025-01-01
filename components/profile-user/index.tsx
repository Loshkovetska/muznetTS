import { UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { User } from "@tamagui/lucide-icons";
import { Text, XStack } from "tamagui";

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
      <Text {...typography["reg-17"]}>
        {user?.name} {user?.surname}
      </Text>
    </XStack>
  );
}
