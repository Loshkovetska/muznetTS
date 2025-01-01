import DialogMedia from "@/components/screens/dialog/dialog-media";
import Text from "@/components/ui/text";
import { MessageItemType } from "@/lib/types";
import { XStack } from "tamagui";

export default function DialogBaseMessage(
  props: MessageItemType & { isSender: boolean }
) {
  const { isSender, ...message } = props;
  return (
    <>
      {message.text?.length > 0 && (
        <Text
          typo="medium-14"
          color={isSender ? "main" : "third"}
        >
          {message.text}
        </Text>
      )}
      {message.files.length > 0 && (
        <DialogMedia
          file={message.files?.[0]}
          imageSize={{ width: "100%", height: 200 }}
        />
      )}
      {message.files.length > 1 && (
        <XStack
          flexWrap="wrap"
          gap={4}
        >
          {message.files.slice(1).map((file) => (
            <DialogMedia
              file={file}
              imageSize={{ width: 60, height: 60 }}
            />
          ))}
        </XStack>
      )}
    </>
  );
}
