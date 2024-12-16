import Navigation from "@/navigation";
import tamaguiConfig from "@/tamagui.config";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { TamaguiProvider } from "tamagui";

SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent
      />
      <Navigation />
    </TamaguiProvider>
  );
}
