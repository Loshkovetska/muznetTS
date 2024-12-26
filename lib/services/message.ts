import { uploadImage } from "@/lib/actions/upload-image";
import {
  ChatItemType,
  MessageItemType,
  SendMessageRequestType,
} from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

class MessageServiceClass {
  constructor() {}

  async sendMessage(
    params: SendMessageRequestType
  ): Promise<MessageItemType | null> {
    const chat = await supabase
      .from("chats")
      .select()
      .in("user1_id", [params.from, params.to])
      .in("user2_id", [params.from, params.to])
      .single();

    let chatId = chat.data?.id;

    if (!chatId) {
      const chat = await supabase
        .from("chats")
        .insert({ user1_id: params.from, user2_id: params.to })
        .select()
        .single();

      chatId = chat.data?.id;
    }

    if (chatId) {
      const imagesUrls = await uploadImage(params.files);

      const message = await supabase
        .from("messages")
        .insert({ ...params, files: imagesUrls })
        .select("*, from:from(*), to:to(*)")
        .single();

      return message?.data;
    }

    return null;
  }

  async getChats(user_id: string): Promise<ChatItemType[]> {
    const chats = await supabase
      .from("chats")
      .select("*, user1:user1_id(*), user2:user2_id(*)")
      .or(`user1_id.eq.${user_id},user2_id.eq.${user_id}`);

    return chats?.data || [];
  }

  async getMessages(chat_id: string): Promise<MessageItemType[]> {
    const messages = await supabase
      .from("messages")
      .select("*, from:from(*), to:to(*)")
      .eq("chat_id", chat_id);

    return messages?.data || [];
  }
}

const MessageService = new MessageServiceClass();

export default MessageService;
