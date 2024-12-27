import DialogMessage from "@/components/screens/dialog/dialog-content/dialog-message";
import useMessages from "@/lib/hooks/messages.hook";
import { MessageItemType, UserType } from "@/lib/types";
import { typography } from "@/tamagui.config";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef } from "react";
import { SectionList } from "react-native";
import { Text } from "tamagui";

type DialogContentPropType = {
  messages?: { title: string; data: MessageItemType[] }[];
  currentUser?: UserType;
};

export default function DialogContent({
  messages,
  currentUser,
}: DialogContentPropType) {
  const ref = useRef<SectionList>(null);
  const today = dayjs().format("DD MMM YYYY");
  const { readMessages } = useMessages({});

  const isSame = useCallback(
    (item: MessageItemType, nextItem?: MessageItemType) => {
      const startMessage =
        nextItem?.from.id === item.from.id || nextItem?.to.id === item.to.id;

      const isSame =
        dayjs(item.created_at).format("HH:MM") ===
        dayjs(nextItem?.created_at).format("HH:MM");

      return startMessage && isSame;
    },
    []
  );

  const updateMessagesStatus = useCallback(
    (
      messages: {
        title: string;
        data: MessageItemType[];
      }[]
    ) => {
      const needToBeRead = messages.flatMap((me) =>
        me.data
          .filter((m) => !m.read_to && m.to.id === currentUser?.id && !m.empty)
          .map((m) => m.id)
      );

      if (needToBeRead.length > 0) {
        readMessages(needToBeRead);
      }
    },
    [currentUser, readMessages]
  );

  useEffect(() => {
    if (ref.current && messages && (messages?.length || 0) > 0) {
      const lastSectionIndex = messages?.length - 1;

      setTimeout(() => {
        ref.current?.scrollToLocation({
          animated: false,
          sectionIndex: lastSectionIndex,
          itemIndex: messages[lastSectionIndex]?.data?.length - 1 || 0,
        });
      }, 1000);
      updateMessagesStatus(messages);
    }
  }, [messages, updateMessagesStatus]);
  return (
    <SectionList
      ref={ref}
      sections={messages || []}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 16,
        paddingBottom: 250,
      }}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          {...typography["heading-14"]}
          textAlign="center"
          color="#5C6574"
        >
          {today === title ? "Today" : title}
        </Text>
      )}
      renderItem={({ item, index, section }) => (
        <DialogMessage
          {...item}
          sameTime={isSame(item, section.data?.[index + 1])}
          type={item.from.id === currentUser?.id ? "sender" : "reciever"}
          key={item.id}
        />
      )}
    />
  );
}
