import { useUser } from "@/components/providers/user-provider";
import ProfileContent from "@/components/screens/profile";
import ProfileMenu from "@/components/screens/profile/profile-menu";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [tab, setTab] = useState<"menu" | "personal" | "ads" | "password">(
    "menu"
  );
  const { user, logOut } = useUser();
  const navigation = useNavigation();

  const changeTab = useCallback((tabName: string) => {
    if (tabName === "menu") {
      router.setParams({ tabbarVisible: "true" });
    } else router.setParams({ tabbarVisible: "false" });

    setTab(tabName as "menu");
  }, []);

  useEffect(() => {
    navigation.addListener("blur", () => changeTab("menu"));

    return () => {
      navigation.removeListener("blur", () => changeTab("menu"));
    };
  }, [changeTab]);

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
