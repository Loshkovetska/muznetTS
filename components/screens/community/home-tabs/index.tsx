import { HOME_TABS } from "@/components/screens/community/home-tabs/constants";
import { Tabs } from "@/components/ui";
import { colors } from "@/tamagui.config";
import { useState } from "react";

export default function HomeTabs() {
  const [tab, setTab] = useState("all");
  return (
    <Tabs
      defaultValue={tab}
      tabs={HOME_TABS}
      onValueChange={setTab}
      paddingTop={8}
      backgroundColor={colors["main"]}
    />
  );
}
