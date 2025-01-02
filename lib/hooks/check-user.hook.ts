import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export function useCheckUser() {
  const [firstLoad, setFirstLoad] = useState<boolean | null>(null);

  const checkUserStatus = useCallback(async () => {
    const exist = await AsyncStorage.getItem("enter");
    const user = await AsyncStorage.getItem("user");
    if (exist && !user) return router.push("/sign-in");

    if (exist) return setFirstLoad(false);

    await AsyncStorage.setItem("enter", "true");
    setFirstLoad(true);
  }, []);

  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  return { firstLoad };
}
