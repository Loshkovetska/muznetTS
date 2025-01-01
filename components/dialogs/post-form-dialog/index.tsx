import { MobileSheet } from "@/components/ui/mobile-sheet";
import React from "react";

type PostFormDialogPropType = {
  open: boolean;
  onOpenChange: () => void;
} & React.PropsWithChildren;

export default function PostFormDialog({
  open,
  children,
  onOpenChange,
}: PostFormDialogPropType) {
  return (
    <MobileSheet
      open={open}
      snapPoints={[80, 42, 80]}
      scrollPaddingBotton={40}
      dismissOnSnapToBottom={false}
      onOpenChange={onOpenChange}
    >
      {children}
    </MobileSheet>
  );
}
