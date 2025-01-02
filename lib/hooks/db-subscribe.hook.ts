import { QUERY_TAGS } from "@/lib/constants";
import { AuthService, PostService } from "@/lib/services";
import { supabase } from "@/lib/utils/supabase";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";

export function useDBSubscribe(user_id?: string) {
  const queryClient = useQueryClient();

  const notifyUser = useCallback(
    async (content: Notifications.NotificationContentInput) => {
      await Notifications.scheduleNotificationAsync({
        content,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2,
          channelId: Platform.OS === "android" ? "default" : undefined,
        },
      });
    },
    []
  );

  const onNew = useCallback(
    async (
      data: RealtimePostgresInsertPayload<{
        [key: string]: any;
      }>
    ) => {
      if (data.table === "likes") {
        const post = await queryClient.fetchQuery({
          queryKey: [QUERY_TAGS.POST, data.new.post_id],
          queryFn: () => PostService.getPost(data.new.post_id),
        });

        if (post?.user.id === user_id && data.new.user_id !== post?.user.id) {
          const user = await queryClient.fetchQuery({
            queryKey: [QUERY_TAGS.USER],
            queryFn: () => AuthService.getUser(data.new.user_id),
          });

          await notifyUser({
            title: "MuzNet",
            subtitle: `${user?.name} ${user?.surname} likes your post`,
            sound: true,
          });
        }
      }
      if (data.table === "messages") {
        console.log(data);
        if (data.new.to === user_id) {
          queryClient.refetchQueries({
            queryKey: [QUERY_TAGS.CHATS, user_id],
          });
          queryClient.refetchQueries({
            queryKey: [QUERY_TAGS.CHATS, data.new.chat_id],
          });
          const user = await queryClient.fetchQuery({
            queryKey: [QUERY_TAGS.USER],
            queryFn: () => AuthService.getUser(data.new.from),
          });
          await notifyUser({
            title: "MuzNet",
            subtitle: `You've got mail 📬 from ${user?.name} ${user?.surname}`,
            body: data.new.deal_id
              ? "Proposition from Vendor. Look at it!"
              : data.new.text,
            sound: true,
          });
        }
      }
    },
    [user_id, notifyUser]
  );

  useEffect(() => {
    supabase
      .channel("supabase_realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        onNew
      )
      .subscribe();
  }, [onNew]);

  return;
}
