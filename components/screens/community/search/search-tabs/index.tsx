import { typography } from "@/tamagui.config";
import { useCallback, useState } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";
import { Stack, Text, XStack, styled } from "tamagui";

const TabsContainer = styled(XStack, {
  width: "100%",
  paddingTop: 12,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderColor: "rgba(92, 101, 116, 0.2)",
  justifyContent: "space-between",
  gap: 16,
  position: "relative",
  paddingBottom: 10,
});

const TabsThumb = styled(Stack, {
  backgroundColor: "rgba(23, 25, 29, 1)",
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
          textAlign="center"
          flexGrow={tabsFull ? 1 / tabs.length : undefined}
          key={currentIndex === tab.id ? "current" : tab.title}
          onPress={() => setIndex(tab.id)}
          onLayout={currentIndex === tab.id ? onLayout : undefined}
          {...typography["heading-14"]}
          color={
            currentIndex === tab.id ? undefined : "rgba(92, 101, 116, 0.6)"
          }
        >
          {tab.title}
        </Text>
      ))}
    </TabsContainer>
  );
}
