import MapImage from "@/assets/images/screens/main/map-new.png";
import WelcomeTitle from "@/assets/images/screens/main/welcome_title.png";
import AdsList from "@/components/screens/homescreen/ads-list";
import Button from "@/components/ui/button";
import { colors, typography } from "@/tamagui.config";
import { Link, Stack } from "expo-router";
import { Image, ScrollView, Text, XStack, YStack, styled } from "tamagui";

const Content = styled(YStack, {
  width: "100%",
  height: "100%",
  alignItems: "center",
  paddingTop: 86,
  paddingBottom: 20,
  paddingHorizontal: 20,
});

const Header = styled(XStack, {
  width: "100%",
  marginBottom: 26,
  alignItems: "center",
  justifyContent: "space-between",
});

const MapContainer = styled(Stack, {
  width: "100%",
  height: 223,
  borderWidth: 1,
  borderColor: colors["gray"],
  borderRadius: 6,
  overflow: "hidden",
  marginTop: 16,
});

const MapContainerBlock = styled(YStack, {
  height: "100%",
  position: "absolute",
  top: 0,
  left: 15,
  bottom: 0,
});

const AdsContainerHeader = styled(XStack, {
  width: "100%",
  marginTop: 35,
  justifyContent: "space-between",
  alignItems: "center",
});

export default function HomeScreen() {
  return (
    <Content>
      <Header>
        <Image
          source={WelcomeTitle}
          resizeMode="contain"
        />
        <Link href="/">
          <Button
            size="sm"
            variant="dark"
            width={125}
          >
            Promote my ad
          </Button>
        </Link>
      </Header>
      {/* list search */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <MapContainer>
          <Image
            source={MapImage}
            resizeMode="cover"
            width="100%"
            height="100%"
          />
          <MapContainerBlock>
            <Text {...typography["heading-28"]}>Find</Text>
            <Text {...typography["heading-28"]}>Nearby</Text>
            <Link href="/">
              <Button
                width={122}
                height={38}
                marginTop={18}
                borderRadius={8}
                size="sm14"
              >
                Go to the map
              </Button>
            </Link>
          </MapContainerBlock>
        </MapContainer>
        <YStack width="100%">
          <AdsContainerHeader>
            <Text {...typography["heading-20"]}>screenTitle</Text>

            <Link href="/">
              <Text {...typography["paragraph-17"]}>View all</Text>
            </Link>
          </AdsContainerHeader>

          {/* Ads container */}
          <AdsList />
        </YStack>
      </ScrollView>
    </Content>
  );
}
