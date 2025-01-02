import { Text } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { useCallback, useState } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";
import { Stack, XStack, styled } from "tamagui";

const TabsContainer = styled(XStack, {
  width: "100%",
  paddingTop: 12,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderColor: colors["gray-20"],
  justifyContent: "space-between",
  gap: 16,
  position: "relative",
  paddingBottom: 10,
});

const TabsThumb = styled(Stack, {
  backgroundColor: colors["black-ru"],
  height: 2,
  width: 26,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  position: "absolute",
  bottom: 0,
});

type SearchTabsPropType = {
  tabs: { id: number; title: string }[];
  currentIndex: number;
  tabsFull?: boolean;
  setIndex: (n: number) => void;
};

export default function SearchTabs({
  currentIndex,
  tabs,
  tabsFull,
  setIndex,
}: SearchTabsPropType) {
  const [layout, setLayout] = useState<LayoutRectangle>({
    width: 26,
    x: 0,
    y: 0,
    height: 2,
  });

  const onLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => setLayout(layout),
    []
  );

  return (
    <TabsContainer>
      <TabsThumb
        left={layout.x}
        width={layout.width}
      />
      {tabs.map((tab) => (
        <Text
          typo="bold-14"
          textAlign="center"
          flexGrow={tabsFull ? 1 / tabs.length : undefined}
          key={currentIndex === tab.id ? "current" : tab.title}
          onPress={() => setIndex(tab.id)}
          onLayout={currentIndex === tab.id ? onLayout : undefined}
          color={currentIndex === tab.id ? undefined : "gray-60"}
        >
          {tab.title}
        </Text>
      ))}
    </TabsContainer>
  );
}
