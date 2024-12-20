import { TABBAR_ICONS } from "@/navigation/tabbar-icon/constants";
import { colors } from "@/tamagui.config";
import { useMemo } from "react";
import { Stack } from "tamagui";

export default function TabbarIcon({
  focused,
  type,
}: {
  focused: boolean;
  type: keyof typeof TABBAR_ICONS;
}) {
  const Icon = useMemo(() => TABBAR_ICONS[type], [type]);
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={4}
      paddingTop={16}
    >
      <Icon
        size={24}
        color={focused ? colors["black"] : "#B9B9BA"}
      />
      <Stack
        width={4}
        height={4}
        borderRadius={4}
        backgroundColor={focused ? colors["black"] : "transparent"}
      />
    </Stack>
  );
}
