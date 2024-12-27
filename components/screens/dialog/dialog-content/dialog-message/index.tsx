import CommonImage from "@/components/common-image";
import DialogMedia from "@/components/screens/dialog/dialog-media";
import { MessageItemType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
import { Pencil } from "@tamagui/lucide-icons";
import dayjs from "dayjs";
import { Stack, Text, XStack, YStack, styled } from "tamagui";

const MessageContainer = styled(YStack, {
  padding: 8,
  borderRadius: 12,
  gap: 4,
  variants: {
    type: {
      reciever: {
        backgroundColor: colors["white"],
        borderBottomLeftRadius: 0,
      },
      sender: {
        backgroundColor: "#333333",
        borderBottomRightRadius: 0,
      },
    },
    sameTime: {
      true: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      },
    },
  },
});

const MessageWrapper = styled(XStack, {
  width: "100%",
  gap: 8,
  alignItems: "flex-end",
  variants: {
    isSender: {
      true: {
        flexDirection: "row-reverse",
      },
    },
    sameTime: {
      true: {
        marginBottom: -8,
      },
    },
  } as const,
});

export default function DialogMessage(
  message: MessageItemType & {
    type: "reciever" | "sender";
    sameTime?: boolean;
  }
) {
  const isSender = message.type === "sender";
  return (
    <MessageWrapper
      isSender={isSender}
      sameTime={message.sameTime}
    >
      {!message.sameTime ? (
        <CommonImage
          width={32}
          height={32}
          borderRadius={16}
          source={(isSender ? message.from : message.to).photo?.[0]}
          marginBottom={message.empty ? 0 : 20}
        />
      ) : (
        <Stack
          width={32}
          height={32}
          marginBottom={message.empty ? 0 : 20}
        />
      )}
      <YStack
        gap={4}
        flexGrow={1}
        alignItems={isSender ? "flex-end" : "flex-start"}
      >
        {message.empty && (
          <XStack
            alignItems="center"
            gap={2}
          >
            <Pencil
              size={14}
              color={"#333333"}
            />
            <Text
              {...typography["paragraph-12"]}
              color="#5C6574"
            >
              writing...
            </Text>
          </XStack>
        )}
        {!message.empty && (
          <>
            <MessageContainer
              type={message.type}
              sameTime={message.sameTime}
              maxWidth="80%"
              width="100%"
            >
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
            </MessageContainer>
            {!message.sameTime && (
              <Text
                {...typography["label-12"]}
                color="#5C6574"
              >
                {dayjs(message.created_at).format("HH:MM")}
              </Text>
            )}
          </>
        )}
      </YStack>
    </MessageWrapper>
  );
}
