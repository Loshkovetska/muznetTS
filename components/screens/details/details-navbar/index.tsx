import { Button } from "@/components/ui";
import { useShare } from "@/lib/hooks";
import { ChevronLeft, Share2 } from "@tamagui/lucide-icons";
import { useNavigation } from "expo-router";
import { XStack, styled } from "tamagui";

const NavBar = styled(XStack, {
  position: "absolute",
  top: 64,
  left: 0,
  zIndex: 20,
  width: "100%",
  paddingInline: 16,
  justifyContent: "space-between",
  alignItems: "center",
});

export default function DetailsNavbar({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const navigation = useNavigation();
  const { onShare } = useShare(true, "/card/" + id, "MuzNet: " + title);
  return (
    <NavBar>
      <Button
        variant="black/50"
        sizeB="icon"
        borderRadius={6}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft
          color="white"
          size={32}
        />
      </Button>
      <Button
        variant="black/50"
        sizeB="icon"
        borderRadius={6}
        onPress={onShare}
      >
        <Share2
          color="white"
          size={24}
        />
      </Button>
    </NavBar>
  );
}
