import { useUser } from "@/components/providers/user-provider";
import AuthService from "@/lib/services/auth";
import { SignInRequestType, SignUpRequestType } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

const useAuth = () => {
  const { updateUser } = useUser();
  const { mutate: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: (args: SignInRequestType) => AuthService.signIn(args),
    onSuccess: async (e) => {
      await AsyncStorage.setItem("user", JSON.stringify(e));
      updateUser();
      router.navigate("/");
    },
    onError: (e) => Alert.alert("Can't sign in user"),
  });

  const { mutate: signUp, isPending: isSignUpPending } = useMutation({
    mutationFn: (params: SignUpRequestType) => AuthService.signUp(params),
    onSuccess: (e) => signIn(e),
    onError: (e) => Alert.alert("Can't create user"),
  });

  return { signIn, signUp, isSignUpPending, isSignInPending };
};

export default useAuth;
