import { colors, typography } from "@/tamagui.config";
import { Stack, Text, XStack, YStack } from "tamagui";

type DealsTabsPropType = {
  tab: "active" | "closed";
  setTab: (tab: "active" | "closed") => void;
};

export default function DealsTabs({ tab, setTab }: DealsTabsPropType) {
  return (
    <XStack
      paddingBottom={8}
      borderBottomWidth={2}
      borderColor="rgba(185,185,186,0.3)"
    >
      <YStack
        flexGrow={1 / 2}
        onPress={() => setTab("active")}
      >
        <Text
          textAlign="center"
          {...typography[tab === "active" ? "heading-17" : "paragraph-17"]}
          lineHeight={22}
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
          {...typography[tab === "closed" ? "heading-17" : "paragraph-17"]}
          lineHeight={22}
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
