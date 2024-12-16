import HomeScreen from "@/components/screens/homescreen";
import OnboardingContent from "@/components/screens/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export default function Index() {
  const [show, setShow] = useState(true);

  const checkUserStatus = useCallback(async () => {
    const exist = await AsyncStorage.getItem("enter");
    if (exist === "true") return setShow(false);
    await AsyncStorage.setItem("enter", "true");
  }, []);

  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  if (show) return <OnboardingContent />;

  return <HomeScreen />;
}
