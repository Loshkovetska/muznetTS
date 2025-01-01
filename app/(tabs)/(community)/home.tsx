import Homebar from "@/components/screens/community/home-bar";
import HomeTabs from "@/components/screens/community/home-tabs";
import { toggleToast } from "@/lib/utils/toast";
import { colors } from "@/tamagui.config";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { YStack } from "tamagui";

export default function Page() {
  const { updating } = useLocalSearchParams();

  useEffect(() => {
    if (updating === "true") {
      toggleToast("Information successfully updated.", "success");
      router.setParams({ updating: "false" });
    }
  }, [updating]);
  return (
    <YStack
      width="100%"
      backgroundColor={colors["main"]}
      flexGrow={1}
    >
      <Homebar />
      <HomeTabs />
    </YStack>
  );
}
