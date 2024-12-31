import { colors, typography } from "@/tamagui.config";
import { Tabs as TTabs, Text, YStackProps, styled } from "tamagui";

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
  backgroundColor: colors["white"],
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors["light-gray"],
  gap: 4,
  marginInline: 16,
});

const Tab = styled(TTabs.Tab, {
  borderRadius: 6,
  backgroundColor: colors["white"],
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
export default function Tabs({
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
              {...typography["heading-14"]}
              color={colors[defaultValue === tab.value ? "white" : "black"]}
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