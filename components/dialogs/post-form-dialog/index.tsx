import { MobileSheet } from "@/components/ui";
import { BaseDialogPropType } from "@/lib/types";
import React from "react";

type PostFormDialogPropType = BaseDialogPropType & React.PropsWithChildren;

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
