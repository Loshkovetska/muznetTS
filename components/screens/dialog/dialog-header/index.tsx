import CommonImage from "@/components/common-image";
import { UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { ChevronLeft, EllipsisVertical } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Text, XStack } from "tamagui";

type DialogHeaderPropType = {
  chatUser?: UserType;
  onOpen: () => void;
};

export default function DialogHeader({
  chatUser,
  onOpen,
}: DialogHeaderPropType) {
  return (
    <XStack
      backgroundColor={colors["white"]}
      paddingHorizontal={16}
      paddingVertical={20}
      paddingTop={64}
      alignItems="center"
    >
      <XStack
        gap={8}
        alignItems="center"
        flexGrow={1}
      >
        <ChevronLeft onPress={() => router.back()} />
        <XStack
          gap={12}
          alignItems="center"
        >
          <CommonImage
            width={32}
            height={32}
            borderRadius={4}
            source={chatUser?.photo?.[0]}
          />
          <Text {...typography["heading-20"]}>
            {chatUser?.name} {chatUser?.surname}
          </Text>
        </XStack>
      </XStack>
      <EllipsisVertical onPress={onOpen} />
    </XStack>
  );
}
