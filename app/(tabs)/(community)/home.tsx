import Homebar from "@/components/screens/community/home-bar";
import HomeTabs from "@/components/screens/community/home-tabs";
import { colors } from "@/tamagui.config";
import { YStack } from "tamagui";

export default function Page() {
  return (
    <YStack
      width="100%"
      backgroundColor={colors["white"]}
      flexGrow={1}
    >
      <Homebar />
      <HomeTabs />
    </YStack>
  );
}
