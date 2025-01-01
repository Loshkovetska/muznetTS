import MapImg from "@/assets/images/screens/main/map-new.png";
import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { colors } from "@/tamagui.config";
import { Link } from "expo-router";
import { Image, Stack, YStack, styled } from "tamagui";

const MapContainer = styled(Stack, {
  width: "100%",
  height: 223,
  borderWidth: 1,
  borderColor: colors["ghost"],
  borderRadius: 6,
  overflow: "hidden",
  position: "relative",
});

const MapContainerBlock = styled(YStack, {
  height: "100%",
  position: "absolute",
  top: 0,
  left: 15,
  bottom: 0,
  justifyContent: "center",
});

export default function MapImage() {
  return (
    <MapContainer>
      <Image
        source={MapImg}
        resizeMode="cover"
        width="100%"
        height="100%"
      />
      <MapContainerBlock>
        <Text typo="black-28">Find</Text>
        <Text typo="black-28">Nearby</Text>
        <Link
          href="/map"
          asChild
        >
          <Button
            width={122}
            height={38}
            marginTop={18}
            paddingHorizontal={12}
            borderRadius={8}
            sizeB="sm15"
            variant="dark"
          >
            Go to the map
          </Button>
        </Link>
      </MapContainerBlock>
    </MapContainer>
  );
}
