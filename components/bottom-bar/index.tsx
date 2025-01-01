import { colors } from "@/tamagui.config";
import { XStack, XStackProps, styled } from "tamagui";

const Container = styled(XStack, {
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: 8,
  paddingHorizontal: 16,
  paddingBottom: 40,
  backgroundColor: colors["main"],
  position: "absolute",
  bottom: 0,
  left: 0,
  borderTopWidth: 1,
  borderColor: colors["light-gray"],
  gap: 16,
  zIndex: 200_000,
});

export default function BottomBar(props: XStackProps) {
  return <Container {...props} />;
}
