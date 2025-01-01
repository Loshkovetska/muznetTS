import CommonImage from "@/components/common-image";
import { MENU } from "@/components/screens/profile/profile-menu/constants";
import Button from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import { UserType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Fragment, useMemo } from "react";
import { Text, XStack, YStack } from "tamagui";

type ProfileMenuPropType = {
  user: UserType | null;
  onChange: (tab: string) => void;
  logOut: () => void;
};

export default function ProfileMenu({
  user,
  onChange,
  logOut,
}: ProfileMenuPropType) {
  const menuItems = useMemo(() => {
    if (user?.user_type === "contractor") {
      return [...MENU, { id: "5", title: "My Ads", tab: "ads" }];
    }
    return MENU;
  }, [user]);
  return (
    <YStack
      gap={32}
      flexGrow={1}
      paddingBottom={120}
      paddingTop={68}
      backgroundColor={colors["main"]}
      paddingHorizontal={16}
    >
      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <Text {...typography["extrabold-28"]}>Hello, {user?.name}</Text>
        <CommonImage
          borderRadius={6}
          source={user?.photo?.[0]}
          width={48}
          height={48}
        />
      </XStack>
      <YStack
        gap={16}
        flexGrow={1}
      >
        {menuItems.map((menuItem, id) => (
          <Fragment key={menuItem.id}>
            {!!id && <Separator />}
            <Button
              sizeB="sm17"
              variant="transparent"
              justifyContent="space-between"
              onPress={() => onChange(menuItem.tab)}
              iconRight={<ChevronRight />}
            >
              {menuItem.title}
            </Button>
          </Fragment>
        ))}
      </YStack>
      <Text
        {...typography["reg-17"]}
        color={colors["dim-gray"]}
        onPress={logOut}
      >
        Log out
      </Text>
    </YStack>
  );
}
