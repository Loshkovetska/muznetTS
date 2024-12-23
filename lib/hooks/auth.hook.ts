import { useUser } from "@/components/providers/user-provider";
import AuthService from "@/lib/services/auth";
import { SignInRequestType, SignUpRequestType } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

const useAuth = () => {
  const [isOpenDialog, setOpenDialog] = useState<SignInRequestType | null>(
    null
  );
  const { updateUser } = useUser();
  const { mutate: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: (args: SignInRequestType) => AuthService.signIn(args),
    onSuccess: async (e) => {
      "id" in e && (await AsyncStorage.setItem("user", e.id));
      updateUser();
      setOpenDialog(null);
      router.navigate("/");
    },
    onError: (e) => Alert.alert("Can't sign in user"),
  });

  const { mutate: signUp, isPending: isSignUpPending } = useMutation({
    mutationFn: (params: SignUpRequestType) => AuthService.signUp(params),
    onSuccess: (e) => setOpenDialog(e),
    onError: (e) => Alert.alert("Can't create user"),
  });

  const onSignIn = useCallback(() => {
    isOpenDialog && signIn(isOpenDialog);
  }, [isOpenDialog]);

  return {
    isOpenDialog,
    isSignUpPending,
    isSignInPending,
    signIn,
    signUp,
    onSignIn,
  };
};

export default useAuth;
