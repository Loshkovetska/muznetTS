import DialogMediaDialog from "@/components/dialogs/dialog-media-dialog";
import DialogBar from "@/components/screens/dialog/dialog-bar";
import DialogContent from "@/components/screens/dialog/dialog-content";
import DialogHeader from "@/components/screens/dialog/dialog-header";
import useMessages from "@/lib/hooks/messages.hook";
import { useState } from "react";
import { YStack } from "tamagui";

//TODO:
// - add read message
// - add scroll to last
// - add sending docs/images
// - add download docs & images from messages
// - add ability to make offer
// - fix nav to chats

export default function Page() {
  const [isOpen, setOpen] = useState(false);
  const { messagesList, currentUser, dialogMedia, chatUser } = useMessages({
    enabled: false,
  });

  return (
    <>
      <YStack
        backgroundColor="#F2F3F9"
        flexGrow={1}
      >
        <DialogHeader
          onOpen={() => setOpen(true)}
          chatUser={chatUser}
        />
        <DialogContent
          currentUser={currentUser || undefined}
          messages={messagesList}
        />
      </YStack>
      <DialogBar chatUser={chatUser} />
      <DialogMediaDialog
        open={isOpen}
        chatUser={chatUser}
        media={dialogMedia}
        onOpenChange={() => setOpen(false)}
      />
    </>
  );
}
