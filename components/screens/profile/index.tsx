import CommonHeader from "@/components/common-header";
import AdsTab from "@/components/screens/profile/ads-tab";
import DealsTab from "@/components/screens/profile/deals-tab";
import PasswordTab from "@/components/screens/profile/password-tab";
import PersonalTab from "@/components/screens/profile/personal-tab";
import { MENU } from "@/components/screens/profile/profile-menu/constants";
import { UserType } from "@/lib/types";
import { useMemo } from "react";

type ProfileContentPropType = {
  tab: "menu" | "personal" | "ads" | "password" | "deals";
  user: UserType | null;
  goToMenu: () => void;
};

export default function ProfileContent({
  tab,
  user,
  goToMenu,
}: ProfileContentPropType) {
  const TITLE = useMemo(
    () => MENU.find((m) => m.tab === tab)?.title || "My Ads",
    [tab]
  );

  const header = useMemo(
    () => (
      <CommonHeader
        title={TITLE}
        onBack={goToMenu}
      />
    ),
    [TITLE, goToMenu]
  );

  return (
    <>
      {tab === "personal" && (
        <PersonalTab
          user={user}
          header={header}
        />
      )}
      {tab === "password" && (
        <PasswordTab
          user={user}
          header={header}
        />
      )}
      {tab === "ads" && (
        <AdsTab
          user={user}
          header={header}
        />
      )}
      {tab === "deals" && (
        <DealsTab
          user={user}
          header={header}
        />
      )}
    </>
  );
}
