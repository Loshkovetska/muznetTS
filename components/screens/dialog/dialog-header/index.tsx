import CommonImage from "@/components/common-image";
import CreateDealDialog from "@/components/dialogs/create-deal-dialog";
import { UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { ChevronLeft, EllipsisVertical } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Text, XStack, YStack } from "tamagui";

type DialogHeaderPropType = {
  chatUser?: UserType;
  currentUser?: UserType;
  onOpen: () => void;
};

export default function DialogHeader({
  chatUser,
  currentUser,
  onOpen,
}: DialogHeaderPropType) {
  return (
    <YStack position="relative">
      <XStack
        backgroundColor={colors["main"]}
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
            <Text {...typography["bold-20"]}>
              {chatUser?.name} {chatUser?.surname}
            </Text>
          </XStack>
        </XStack>
        <EllipsisVertical onPress={onOpen} />
      </XStack>
      {currentUser?.user_type === "contractor" && (
        <CreateDealDialog
          user_id={currentUser.id}
          performer_id={chatUser?.id || ""}
        />
      )}
    </YStack>
  );
}
