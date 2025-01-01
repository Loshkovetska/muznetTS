import CommonImage from "@/components/common-image";
import { UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { Text, XStack, YStack } from "tamagui";

export default function PostItemUser(
  user: UserType & { postLocation?: string }
) {
  return (
    <XStack
      gap={8}
      flexGrow={1}
      alignItems="center"
    >
      <CommonImage
        source={user?.photo?.[0]}
        width={32}
        height={32}
        borderRadius={16}
        borderWidth={1}
        borderColor={colors["black"]}
      />
      <YStack>
        <Text {...typography["bold-14"]}>
          {user?.name} {user?.surname}
        </Text>
        {user?.postLocation && (
          <Text {...typography["medium-12"]}>{user.postLocation}</Text>
        )}
      </YStack>
    </XStack>
  );
}
