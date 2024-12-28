import { useUser } from "@/components/providers/user-provider";
import ProfileContent from "@/components/screens/profile";
import ProfileMenu from "@/components/screens/profile/profile-menu";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [tab, setTab] = useState<
    "menu" | "personal" | "ads" | "password" | "deals"
  >("menu");
  const { user, logOut } = useUser();
  const navigation = useNavigation();
  const currentTab = useLocalSearchParams()?.tab as string | undefined;

  const changeTab = useCallback((tabName: string) => {
    if (tabName === "menu") {
      router.setParams({ tab: null });
    } else router.setParams({ tab: tabName });

    setTab(tabName as "menu");
  }, []);

  useEffect(() => {
    navigation.addListener("blur", () => changeTab("menu"));

    return () => {
      navigation.removeListener("blur", () => changeTab("menu"));
    };
  }, [changeTab]);

  useEffect(() => {
    if (currentTab) {
      if (currentTab === "null") {
        return setTab("menu");
      }
      setTab(currentTab as "menu");
    }
  }, [currentTab]);

  return (
    <>
      {tab === "menu" && (
        <ProfileMenu
          user={user}
          onChange={changeTab}
          logOut={logOut}
        />
      )}

      {tab !== "menu" && (
        <ProfileContent
          user={user}
          tab={tab}
          goToMenu={() => changeTab("menu")}
        />
      )}
    </>
  );
}
