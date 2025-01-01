import { useUser } from "@/components/providers/user-provider";
import AdsList from "@/components/screens/homescreen/ads-list";
import MapImage from "@/components/screens/homescreen/map-image";
import SearchWithFilter from "@/components/search-with-filter";
import Text from "@/components/ui/text";
import { colors } from "@/tamagui.config";
import { ScrollView, XStack, YStack, styled } from "tamagui";

const Content = styled(YStack, {
  width: "100%",
  height: "100%",
  alignItems: "center",
  paddingTop: 86,
  paddingBottom: 20,
  paddingHorizontal: 16,
  backgroundColor: colors["main"],
  gap: 16,
});

const Header = styled(XStack, {
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <Content>
      <Header>
        <Text typo="bold-34">Welcome 👋🏻</Text>
      </Header>
      <SearchWithFilter />
      <ScrollView
        showsVerticalScrollIndicator={false}
        width="100%"
        contentContainerStyle={{ gap: 32 }}
      >
        <MapImage />
        <AdsList
          title={`Popular ${
            user?.user_type === "contractor" ? "Musicians" : "Vendors"
          }`}
          type="popular"
        />
      </ScrollView>
    </Content>
  );
}
