import DialogMessage from "@/components/screens/dialog/dialog-content/dialog-message";
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

  useEffect(() => {
    if (ref.current && messages && (messages?.length || 0) > 0) {
      const lastSectionIndex = messages?.length - 1;

      ref.current.scrollToLocation({
        animated: false,
        sectionIndex: lastSectionIndex,
        itemIndex: messages[lastSectionIndex]?.data?.length - 1 || 0,
      });
    }
  }, [messages]);
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