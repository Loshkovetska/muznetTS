import SelectProvider from "@/components/providers/select-provider";
import { colors } from "@/tamagui.config";
import { Sheet } from "@tamagui/sheet";
import React, { useState } from "react";
import { ScrollView, Stack } from "tamagui";

type MobileSheetPropType = {
  open: boolean;
  header?: React.ReactNode;
  showThumb?: boolean;
  scrollViewMaxHeight?: number;
  scrollPaddingBotton?: number;
  dismissOnSnapToBottom?: boolean;
  snapPoints?: number[];
  onOpenChange: (f: boolean) => void;
} & React.PropsWithChildren;

export const MobileSheet = ({
  children,
  open,
  header,
  showThumb = true,
  scrollViewMaxHeight,
  scrollPaddingBotton,
  dismissOnSnapToBottom = true,
  snapPoints,
  onOpenChange,
}: MobileSheetPropType) => {
  const [scrollRef, setRef] = useState<ScrollView | null>(null);
  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPointsMode={snapPoints ? "percent" : "fit"}
      snapPoints={snapPoints}
      dismissOnSnapToBottom={dismissOnSnapToBottom}
      zIndex={100_000}
      animation="fast"
      unmountChildrenWhenHidden
      moveOnKeyboardChange
      dismissOnOverlayPress={snapPoints ? false : undefined}
    >
      <Sheet.Overlay
        unstyled={!dismissOnSnapToBottom && open}
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Frame
        padding={16}
        justifyContent="center"
        gap={24}
        disableHideBottomOverflow={!!snapPoints}
        backgroundColor={colors["white"]}
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
          >
            {children}
          </Sheet.ScrollView>
        </SelectProvider>
      </Sheet.Frame>
    </Sheet>
  );
};
