import CommonHeader from "@/components/common-header";
import { colors } from "@/tamagui.config";
import { AlertCircle, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { YStack } from "tamagui";

export default function Page() {
  return (
    <YStack
      backgroundColor={colors["white"]}
      flexGrow={1}
    >
      <CommonHeader
        title="Create New Post"
        buttonLeft={<AlertCircle />}
        buttonRight={<X onPress={() => router.back()} />}
        justifyContent="space-between"
        paddingHorizontal={16}
        withBorder
      />
    </YStack>
  );
}
