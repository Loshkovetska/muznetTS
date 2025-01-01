import CameraDialog from "@/components/dialogs/camera-dialog";
import UploadDialog from "@/components/dialogs/upload-dialog";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useMessages from "@/lib/hooks/messages.hook";
import { UserType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { Paperclip, SendHorizontal } from "@tamagui/lucide-icons";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { XStack } from "tamagui";

export default function DialogBar({ chatUser }: { chatUser?: UserType }) {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [emptyMessage, setEmptyMessage] = useState(false);
  const [dialogs, setDialogs] = useState({
    upload: false,
    camera: false,
  });

  const { currentUser, sendMessage, addEmptyMessage, removeEmptyMessage } =
    useMessages({
      onSuccess: resetState,
    });

  const onSendMessage = useCallback(
    (files?: any[]) => {
      sendMessage({
        files: files || [],
        from: currentUser?.id || "",
        to: chatUser?.id || "",
        text: message,
      });
      setEmptyMessage(false);
      setDialogs((prev) => ({ ...prev, camera: false }));
    },
    [currentUser, chatUser, message, sendMessage]
  );

  const onValueChange = useCallback(
    (v: string) => {
      if (v.length && !emptyMessage) {
        addEmptyMessage();
        setEmptyMessage(true);
      }
      if (!v.length) {
        setEmptyMessage(false);
        removeEmptyMessage();
      }
      setMessage(v);
    },
    [emptyMessage, addEmptyMessage, removeEmptyMessage]
  );

  const toggleState = useCallback((name: string, value: boolean) => {
    setDialogs((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onCameraOpen = useCallback(
    (open: boolean) => {
      toggleState("camera", open);
      toggleState("upload", !open);
    },
    [toggleState]
  );

  useEffect(() => {
    navigation.addListener("blur", resetState);

    return () => navigation.removeListener("blur", resetState);
  }, [navigation, resetState]);

  function resetState() {
    setMessage("");
    setEmptyMessage(false);
    removeEmptyMessage();
    setDialogs({ upload: false, camera: false });
  }

  return (
    <>
      <XStack
        padding={16}
        paddingBottom={40}
        backgroundColor={colors["white"]}
        position="absolute"
        width="100%"
        left={0}
        bottom={0}
      >
        <Input
          value={message}
          animate={false}
          iconLeft={
            <Paperclip
              color="#5C6574"
              onPress={() => toggleState("upload", true)}
            />
          }
          placeholder="Write your message here"
          iconRight={
            <Button
              variant="dark"
              sizeB="icon-32"
              disabled={!message.length}
              onPress={() => onSendMessage()}
            >
              <SendHorizontal
                size={16}
                color={colors["white"]}
              />
            </Button>
          }
          onChangeText={onValueChange}
        />
        <UploadDialog
          open={dialogs["upload"]}
          onOpenChange={() => toggleState("upload", false)}
          onCameraOpen={() => onCameraOpen(true)}
          sendMessage={onSendMessage}
        />
      </XStack>
      <CameraDialog
        open={dialogs.camera}
        onOpenChange={() => onCameraOpen(false)}
        onAccept={onSendMessage}
      />
    </>
  );
}
