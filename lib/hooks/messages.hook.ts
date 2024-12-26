import { useUser } from "@/components/providers/user-provider";
import { QUERY_TAGS } from "@/lib/constants";
import MessageService from "@/lib/services/message";
import { MessageItemType, SendMessageRequestType } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";

type UseMessagesPropType = {
  enabled?: boolean;
  navigate?: boolean;
};

export default function useMessages({
  enabled = true,
  navigate = false,
}: UseMessagesPropType) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

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
        queryClient.setQueryData(
          [QUERY_TAGS.MESSAGES, selectedChat],
          (old: MessageItemType[]) => [...old, dt]
        );
        navigate && router.navigate("/chat");
      }
    },
  });

  return { sendMessage, isSendPending, chats, messages };
}
