import Toast from "react-native-toast-message";

export const toggleToast = (message: string, type: "success" | "error") => {
  Toast.show({
    text1: message,
    type: type,
  });
};
