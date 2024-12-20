import AuthSignIn from "@/components/screens/auth/sign-in";
import AuthSignUp from "@/components/screens/auth/sign-up";
import { useMemo } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

type AuthWrapperPropType = {
  type: "sign-in" | "sign-up";
};

export default function AuthWrapper({ type }: AuthWrapperPropType) {
  const component = useMemo(() => {
    switch (type) {
      case "sign-in":
        return <AuthSignIn />;
      case "sign-up":
        return <AuthSignUp />;
      default:
        return <AuthSignIn />;
    }
  }, [type]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flexGrow: 1 }}
    >
      {component}
    </KeyboardAvoidingView>
  );
}
