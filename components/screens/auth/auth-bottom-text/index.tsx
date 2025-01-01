import { colors, typography } from "@/tamagui.config";
import { Link } from "expo-router";
import { Text } from "tamagui";

export default function AuthBottomText({ isSignIn }: { isSignIn: boolean }) {
  return (
    <Text
      color={colors["comet"]}
      textAlign="center"
      {...typography["reg-17"]}
    >
      {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
      <Link
        asChild
        href={isSignIn ? "/sign-up" : "/sign-in"}
      >
        <Text
          color={colors["black"]}
          fontFamily="MulishBold"
        >
          {!isSignIn ? "Sign In" : "Sign Up"}
        </Text>
      </Link>
    </Text>
  );
}
