import { useUser } from "@/components/providers/user-provider";
import { QUERY_TAGS } from "@/lib/constants";
import MessageService from "@/lib/services/message";
import { MessageItemType, SendMessageRequestType } from "@/lib/types";
import { generateMessagesList } from "@/lib/utils/message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";

type UseMessagesPropType = {
  enabled?: boolean;
  navigate?: boolean;
  onSuccess?: () => void;
};

export default function useMessages({
  enabled = true,
  navigate = false,
  onSuccess,
}: UseMessagesPropType) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const selectedChat = useLocalSearchParams()?.id as string;

  const [searchValue, setSearchValue] = useState("");

  const { data: chats } = useQuery({
    queryKey: [QUERY_TAGS.CHATS, user?.id],
    queryFn: () => MessageService.getChats(user?.id || ""),
    enabled: !!user?.id && enabled,
  });

  const { data: messages } = useQuery({
    queryKey: [QUERY_TAGS.MESSAGES, selectedChat],
    queryFn: () => MessageService.getMessages(selectedChat || ""),
    enabled: !!selectedChat,
  });

  const { mutate: sendMessage, isPending: isSendPending } = useMutation({
    mutationFn: (params: SendMessageRequestType) =>
      MessageService.sendMessage(params),
    onSuccess: (dt) => {
      if (dt) {
        selectedChat &&
          queryClient.setQueryData(
            [QUERY_TAGS.MESSAGES, selectedChat],
            (old: MessageItemType[]) => [
              ...(old || []).filter((c) => !c.empty),
              dt,
            ]
          );
        navigate && router.navigate("/chat/index");
        onSuccess?.();
      }
    },
  });

  const chatsList = useMemo(() => {
    if (!searchValue.length) return chats;
    return chats?.filter((chat) => {
      const searchUser = chat.user1.id !== user?.id ? chat.user1 : chat.user2;
      const fullname = `${searchUser.name} ${searchUser.surname}`.toLowerCase();

      return fullname.includes(searchValue.toLowerCase());
    });
  }, [chats, user, searchValue]);

  const messagesList = useMemo(
    () => generateMessagesList(messages || []),
    [messages]
  );

  const dialogMedia = useMemo(
    () => messages?.flatMap((item) => item.files) || [],
    [messages]
  );

  const chatUser = useMemo(() => {
    const firstMessage = messages?.[0];
    return firstMessage?.from.id === user?.id
      ? firstMessage?.to
      : firstMessage?.from;
  }, [messages, user]);

  const addEmptyMessage = useCallback(() => {
    queryClient.setQueryData(
      [QUERY_TAGS.MESSAGES, selectedChat],
      (old: MessageItemType[]) => [
        ...old,
        {
          id: "1",
          from: user,
          to: chatUser,
          text: null,
          empty: true,
          files: [],
        },
      ]
    );
  }, [chatUser, user, selectedChat]);

  const removeEmptyMessage = useCallback(() => {
    queryClient.setQueryData(
      [QUERY_TAGS.MESSAGES, selectedChat],
      (old: MessageItemType[]) => old?.filter((i) => !i.empty)
    );
  }, [chatUser, user, selectedChat]);

  return {
    isSendPending,
    chats: chatsList || [],
    messages: messages || [],
    messagesList: messagesList || [],
    currentUser: user,
    searchValue,
    dialogMedia,
    chatUser,
    sendMessage,
    setSearchValue,
    addEmptyMessage,
    removeEmptyMessage,
  };
}