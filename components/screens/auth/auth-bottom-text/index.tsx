import Text from "@/components/ui/text";
import { Link } from "expo-router";

export default function AuthBottomText({ isSignIn }: { isSignIn: boolean }) {
  return (
    <Text
      color="comet"
      textAlign="center"
      typo="reg-17"
    >
      {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
      <Link
        asChild
        href={isSignIn ? "/sign-up" : "/sign-in"}
      >
        <Text
          color="black"
          typo="bold-17"
        >
          {!isSignIn ? "Sign In" : "Sign Up"}
        </Text>
      </Link>
    </Text>
  );
}
