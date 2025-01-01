import SelectProvider from "@/components/providers/select-provider";
import { Sheet } from "@tamagui/sheet";
import React, { useState } from "react";
import { ScrollView, Stack } from "tamagui";

type MobileSheetPropType = {
  open: boolean;
  header?: React.ReactNode;
  showThumb?: boolean;
  scrollViewMaxHeight?: number;
  scrollPaddingBotton?: number;
  onOpenChange: (f: boolean) => void;
} & React.PropsWithChildren;

export const MobileSheet = ({
  children,
  open,
  header,
  showThumb = true,
  scrollViewMaxHeight,
  scrollPaddingBotton,
  onOpenChange,
}: MobileSheetPropType) => {
  const [scrollRef, setRef] = useState<ScrollView | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPointsMode="fit"
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="fast"
      unmountChildrenWhenHidden
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
        <SelectProvider
          coords={{ x: 0, y: 0 }}
          scrollRef={scrollRef}
        >
          {showThumb && (
            <Stack
              width={72}
              height={5}
              borderRadius={5}
              backgroundColor="#E0E0E0"
              alignSelf="center"
            />
          )}
          {header}
          <Sheet.ScrollView
            maxHeight={scrollViewMaxHeight}
            showsVerticalScrollIndicator={false}
            paddingBottom={16}
            ref={(ref) => {
              ref && setRef(ref);
            }}
            contentContainerStyle={{
              paddingBottom: scrollPaddingBotton,
            }}
            onLayout={({ nativeEvent: { layout } }) => {
              setCoords({ x: layout.x, y: layout.y });
            }}
          >
            {children}
          </Sheet.ScrollView>
        </SelectProvider>
      </Sheet.Frame>
    </Sheet>
  );
};
