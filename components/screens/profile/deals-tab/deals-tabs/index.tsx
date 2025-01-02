import { Text } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { Stack, XStack, YStack } from "tamagui";

type DealsTabsPropType = {
  tab: "active" | "closed";
  setTab: (tab: "active" | "closed") => void;
};

export default function DealsTabs({ tab, setTab }: DealsTabsPropType) {
  return (
    <XStack
      paddingBottom={8}
      borderBottomWidth={2}
      borderColor={colors["ghost-30"]}
    >
      <YStack
        flexGrow={1 / 2}
        onPress={() => setTab("active")}
      >
        <Text
          typo={tab === "active" ? "bold-17" : "reg-17"}
          textAlign="center"
        >
          Active
        </Text>
      </YStack>
      <YStack
        flexGrow={1 / 2}
        onPress={() => setTab("closed")}
      >
        <Text
          textAlign="center"
          typo={tab === "closed" ? "bold-17" : "reg-17"}
        >
          Closed
        </Text>
      </YStack>
      <Stack
        position="absolute"
        height={2}
        width="50%"
        backgroundColor={colors["black"]}
        bottom={-2}
        left={tab === "closed" ? "50%" : 0}
      />
    </XStack>
  );
}
