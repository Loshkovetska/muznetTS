import { Text } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { Tabs as TTabs, YStackProps, styled } from "tamagui";

type TabsPropType = {
  defaultValue: string;
  tabs: {
    title: string;
    value: string;
    content: React.ReactNode;
  }[];
  onValueChange: (value: string) => void;
} & YStackProps;

const Container = styled(TTabs, {
  gap: 20,
  width: "100%",
  flexDirection: "column",
});

const TabList = styled(TTabs.List, {
  padding: 4,
  backgroundColor: colors["main"],
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors["light-gray"],
  gap: 4,
  marginInline: 16,
});

const Tab = styled(TTabs.Tab, {
  borderRadius: 6,
  backgroundColor: colors["main"],
  flexGrow: 1,
  height: 32,
  variants: {
    selected: {
      true: {
        backgroundColor: colors["black"],
      },
    },
  },
});

export function Tabs({
  defaultValue,
  tabs,
  onValueChange,
  ...props
}: TabsPropType) {
  return (
    <Container
      value={defaultValue}
      orientation="horizontal"
      onValueChange={onValueChange}
      {...props}
    >
      <TabList disablePassBorderRadius="bottom">
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            selected={defaultValue === tab.value}
          >
            <Text
              typo="bold-14"
              color={defaultValue === tab.value ? "main" : "black"}
            >
              {tab.title}
            </Text>
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TTabs.Content
          value={tab.value}
          key={tab.value}
        >
          {tab.content}
        </TTabs.Content>
      ))}
    </Container>
  );
}
