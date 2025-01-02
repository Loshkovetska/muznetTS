import { useUser } from "@/components/providers/user-provider";
import { AuthService } from "@/lib/services";
import { SignInRequestType, SignUpRequestType } from "@/lib/types";
import { toggleToast } from "@/lib/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useState } from "react";

export const useAuth = () => {
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
    onError: (e) => toggleToast("Can't sign in user", "error"),
  });

  const { mutate: signUp, isPending: isSignUpPending } = useMutation({
    mutationFn: (params: SignUpRequestType) => AuthService.signUp(params),
    onSuccess: (e) => setOpenDialog(e),
    onError: (e) => toggleToast("Can't create user", "error"),
  });

  const onSignIn = useCallback(() => {
    isOpenDialog && signIn(isOpenDialog);
  }, [isOpenDialog, signIn]);

  return {
    isOpenDialog,
    isSignUpPending,
    isSignInPending,
    signIn,
    signUp,
    onSignIn,
  };
};
