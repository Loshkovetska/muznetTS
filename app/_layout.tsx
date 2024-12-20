import Providers from "@/components/providers";
import Navigation from "@/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { SplashScreen, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [show, setShow] = useState(true);

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

  const checkUserStatus = useCallback(async () => {
    const exist = await AsyncStorage.getItem("enter");
    const user = await AsyncStorage.getItem("user");
    if (exist && user) return setShow(false);
    if (exist && !user) return router.navigate("/sign-in");

    await AsyncStorage.setItem("enter", "true");
  }, []);

  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  if (!loaded) {
    return null;
  }
  return (
    <Providers>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent
      />
      <Navigation firstLoad={show} />
    </Providers>
  );
}
