import { useUser } from "@/components/providers/user-provider";
import { QUERY_TAGS } from "@/lib/constants";
import { MessageService } from "@/lib/services";
import { MessageItemType, SendMessageRequestType } from "@/lib/types";
import { generateMessagesList } from "@/lib/utils/message";
import { supabase } from "@/lib/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseMessagesPropType = {
  enabled?: boolean;
  enabledMessages?: boolean;
  navigate?: boolean;
  onSuccess?: () => void;
  onSuccessDelete?: () => void;
};

export default function useMessages({
  enabled = false,
  enabledMessages = false,
  navigate = false,
  onSuccess,
  onSuccessDelete,
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

  const { data: messages, refetch } = useQuery({
    queryKey: [QUERY_TAGS.MESSAGES, selectedChat],
    queryFn: () => MessageService.getMessages(selectedChat || ""),
    enabled: !!selectedChat && enabledMessages,
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
        navigate && router.navigate("/(tabs)/(chat)/dialogs");
        onSuccess?.();
      }
    },
  });

  const { mutate: readMessages } = useMutation({
    mutationFn: (ids: string[]) => MessageService.readMessages(ids),
    onSuccess: (_, vars) => {
      selectedChat &&
        queryClient.setQueryData(
          [QUERY_TAGS.MESSAGES, selectedChat],
          (old: MessageItemType[]) =>
            old.map((i) => ({
              ...i,
              read_to: vars.includes(i.id) ? true : i.read_to,
            }))
        );
    },
  });

  const { mutate: deleteMessage, isPending: isDeletePending } = useMutation({
    mutationFn: (id: string) => MessageService.deleteMessage(id),
    onSuccess: (data, vars) => {
      if (data) {
        queryClient.setQueryData(
          [QUERY_TAGS.MESSAGES, selectedChat],
          (old: MessageItemType[]) => old.filter((i) => i.id !== vars)
        );
        onSuccessDelete?.();
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

  const messageWithDeal = useMemo(
    () => messages?.find((m) => m.deal),
    [messages]
  );

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

  useEffect(() => {
    supabase
      .channel("supabase_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => refetch()
      )
      .subscribe();
  }, []);

  return {
    isSendPending,
    chats: chatsList || [],
    messages: messages || [],
    messagesList: messagesList || [],
    currentUser: user,
    searchValue,
    dialogMedia,
    chatUser,
    messageWithDeal,
    isDeletePending,
    sendMessage,
    setSearchValue,
    addEmptyMessage,
    removeEmptyMessage,
    readMessages,
    refetch,
    deleteMessage,
  };
}
