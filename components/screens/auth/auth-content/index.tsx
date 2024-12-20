import { colors } from "@/tamagui.config";
import { GetProps, YStack, styled } from "tamagui";

const Container = styled(YStack, {
  width: "100%",
  flexGrow: 1,
  backgroundColor: colors["white"],
  paddingTop: 60,
  paddingBottom: 50,
  paddingHorizontal: 16,
});

export default function AuthContent(
  props: React.PropsWithChildren & GetProps<typeof Container>
) {
  return <Container {...props} />;
}
