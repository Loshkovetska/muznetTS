import DialogMedia from "@/components/screens/dialog/dialog-media";
import { MessageItemType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { Text, XStack } from "tamagui";

export default function DialogBaseMessage(
  props: MessageItemType & { isSender: boolean }
) {
  const { isSender, ...message } = props;
  return (
    <>
      {message.text?.length > 0 && (
        <Text
          {...typography["label-14"]}
          color={isSender ? colors["white"] : "#333333"}
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
