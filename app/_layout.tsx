import Providers from "@/components/providers";
import { useNotifications } from "@/lib/hooks";
import Navigation from "@/navigation";
import { colors } from "@/tamagui.config";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [loaded] = useFonts({
    MulishLight: require("../assets/fonts/Mulish-Light.otf"),
    MulishRegular: require("../assets/fonts/Mulish-Regular.otf"),
    MulishMedium: require("../assets/fonts/Mulish-Medium.otf"),
    MulishSemiBold: require("../assets/fonts/Mulish-SemiBold.otf"),
    MulishExtraBold: require("../assets/fonts/Mulish-ExtraBold.otf"),
    MulishBold: require("../assets/fonts/Mulish-Bold.otf"),
    MulishBlack: require("../assets/fonts/Mulish-Black.otf"),
  });

  useNotifications();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors["main"]}
        translucent
      />
      <Navigation />
    </Providers>
  );
}
