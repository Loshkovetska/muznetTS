import DialogMediaDialog from "@/components/dialogs/dialog-media-dialog";
import DialogBar from "@/components/screens/dialog/dialog-bar";
import DialogContent from "@/components/screens/dialog/dialog-content";
import DialogHeader from "@/components/screens/dialog/dialog-header";
import useMessages from "@/lib/hooks/messages.hook";
import { colors } from "@/tamagui.config";
import { useState } from "react";
import { YStack } from "tamagui";

export default function Page() {
  const [isOpen, setOpen] = useState(false);
  const { messagesList, currentUser, dialogMedia, chatUser } = useMessages({
    enabledMessages: true,
  });

  return (
    <>
      <YStack
        backgroundColor={colors["ghost-white"]}
        flexGrow={1}
      >
        <DialogHeader
          chatUser={chatUser}
          currentUser={currentUser || undefined}
          onOpen={() => setOpen(true)}
        />

        <DialogContent
          currentUser={currentUser || undefined}
          messages={messagesList}
        />
      </YStack>
      <DialogBar chatUser={chatUser} />
      {isOpen && (
        <DialogMediaDialog
          open={isOpen}
          chatUser={chatUser}
          media={dialogMedia}
          onOpenChange={() => setOpen(false)}
        />
      )}
    </>
  );
}
