import SignInForm from "@/components/forms/sign-in-form";
import AuthBottomText from "@/components/screens/auth/auth-bottom-text";
import AuthContent from "@/components/screens/auth/auth-content";
import AuthSocial from "@/components/screens/auth/auth-socials";
import { typography } from "@/tamagui.config";
import { Text, YStack, styled } from "tamagui";

const Content = styled(YStack, {
  width: "100%",
  alignItems: "center",
  flexGrow: 1,
});

export default function AuthSignIn() {
  return (
    <AuthContent>
      <Content>
        <Text
          {...typography["bold-28"]}
          marginBottom={32}
          width="100%"
          textAlign="center"
        >
          MuzNet
        </Text>
        <SignInForm />
        <AuthSocial />
      </Content>
      <AuthBottomText isSignIn />
    </AuthContent>
  );
}
