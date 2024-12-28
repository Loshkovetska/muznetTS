import CommonImage from "@/components/common-image";
import DialogBaseMessage from "@/components/screens/dialog/dialog-content/dialog-message/dialog-base-message";
import DialogEmptyMessage from "@/components/screens/dialog/dialog-content/dialog-message/dialog-empty-message";
import DialogOfferMessage from "@/components/screens/dialog/dialog-content/dialog-message/dialog-offer-message";
import { MessageItemType } from "@/lib/types";
import { colors, typography } from "@/tamagui.config";
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

  if (message.deal)
    return (
      <DialogOfferMessage
        {...message.deal}
        from={message.from}
      />
    );
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
        {message.empty && <DialogEmptyMessage />}
        {!message.empty && (
          <>
            <MessageContainer
              type={message.type}
              sameTime={message.sameTime}
              maxWidth="80%"
              width="100%"
            >
              <DialogBaseMessage
                {...message}
                isSender={isSender}
              />
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
