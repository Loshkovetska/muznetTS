import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useMessages from "@/lib/hooks/messages.hook";
import { UserType } from "@/lib/types";
import { colors } from "@/tamagui.config";
import { Navigation2, Paperclip } from "@tamagui/lucide-icons";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { XStack } from "tamagui";

export default function DialogBar({ chatUser }: { chatUser?: UserType }) {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [emptyMessage, setEmptyMessage] = useState(false);

  const { currentUser, sendMessage, addEmptyMessage, removeEmptyMessage } =
    useMessages({ onSuccess: resetState });

  const onSendMessage = useCallback(() => {
    sendMessage({
      files: [],
      from: currentUser?.id || "",
      to: chatUser?.id || "",
      text: message,
    });
    setEmptyMessage(false);
  }, [currentUser, chatUser, message, sendMessage]);

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

  useEffect(() => {
    navigation.addListener("blur", resetState);

    return () => navigation.removeListener("blur", resetState);
  }, [navigation, resetState]);

  function resetState() {
    setMessage("");
    setEmptyMessage(false);
    removeEmptyMessage();
  }

  return (
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
        iconLeft={<Paperclip color="#5C6574" />}
        placeholder="Write your message here"
        iconRight={
          <Button
            variant="dark"
            sizeB="icon-32"
            disabled={!(message.length > 3)}
            onPress={onSendMessage}
          >
            <Navigation2
              rotate="90deg"
              size={16}
              color={colors["white"]}
            />
          </Button>
        }
        onChangeText={onValueChange}
      />
    </XStack>
  );
}
