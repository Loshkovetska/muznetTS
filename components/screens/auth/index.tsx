import Logo from "@/assets/images/partial-react-logo.png";
import { colors, typography } from "@/tamagui.config";
import { Text, YStack, styled } from "tamagui";

const Container = styled(YStack, {
  width: "100%",
  backgroundColor: colors["white"],
  paddingHorizontal: 20,
});

const Content = styled(YStack, {
  paddingTop: "20%",
  width: "100%",
  alignItems: "center",
  backgroundColor: colors["white"],
});

export default function AuthWrapper() {
  return (
    <Container>
      <Content>
        <Logo />
        {/* <PlainLogo
            width={101}
            height={35}
            resizeMode="cover"
          /> */}

        <Text
          {...typography["heading-28"]}
          marginTop="17%"
          marginBottom={32}
          width="100%"
        >
          Welcome Back!
        </Text>
      </Content>
    </Container>
  );
}
