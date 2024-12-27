import { Sheet } from "@tamagui/sheet";
import React from "react";
import { Stack } from "tamagui";

type MobileSheetPropType = {
  open: boolean;
  onOpenChange: (f: boolean) => void;
} & React.PropsWithChildren;

export const MobileSheet = ({
  children,
  open,
  onOpenChange,
}: MobileSheetPropType) => {
  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPointsMode="fit"
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="fast"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Frame
        padding={16}
        justifyContent="center"
        gap="$5"
      >
        <Stack
          width={72}
          height={5}
          borderRadius={5}
          backgroundColor="#E0E0E0"
          alignSelf="center"
        />
        <Sheet.ScrollView paddingBottom={16}>{children}</Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};
