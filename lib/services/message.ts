import { uploadImage } from "@/lib/actions/upload-image";
import {
  ChatItemType,
  MessageItemType,
  SendMessageRequestType,
} from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

class MessageServiceClass {
  constructor() {}

  async addChat(from: string, to: string): Promise<string | undefined> {
    let chatId;

    const chat = await supabase
      .from("chats")
      .select("id")
      .or(
        `user1_id.eq.${from},user2_id.eq.${to},user1_id.eq.${to},user2_id.eq.${from}`
      )
      .single();
    chatId = chat.data?.id;

    if (!chatId) {
      const chat = await supabase
        .from("chats")
        .insert({ user1_id: from, user2_id: to })
        .select("id")
        .single();

      chatId = chat.data?.id;
    }

    return chatId;
  }

  async sendMessage(
    params: SendMessageRequestType
  ): Promise<MessageItemType | null> {
    const chatId = await this.addChat(params.from, params.to);

    if (chatId) {
      const imagesUrls = await uploadImage(params.files);

      const message = await supabase
        .from("messages")
        .insert({ ...params, files: imagesUrls, chat_id: chatId })
        .select(
          "*, from:from(id,name, surname, photo), to:to(id,name, surname, photo)"
        )
        .single();

      return message?.data;
    }

    return null;
  }

  async getChats(user_id: string): Promise<ChatItemType[]> {
    const chats = await supabase
      .from("messages")
      .select(
        "*, user1:from(id,name, surname, photo), user2:to(id,name, surname, photo)"
      )
      .order("created_at", { ascending: false })
      .or(`from.eq.${user_id},to.eq.${user_id}`);

    const chatIds = chats.data?.map((chat) => chat.chat_id) || [];

    return Array.from(new Set(chatIds)).map((id) => {
      const messages = chats.data?.filter((ch) => ch.chat_id === id);
      const mainChat = messages?.[0];

      const countToRead = messages?.reduce((prev, curr) => {
        if (curr.to === user_id && !curr.read_to) return prev + 1;
        return prev;
      }, 0);

      return {
        id,
        user1: mainChat?.user1,
        user2: mainChat?.user2,
        last_message: mainChat.text,
        created_at: mainChat.created_at,
        count_to_read: countToRead,
      };
    });
  }

  async getMessages(chat_id: string): Promise<MessageItemType[]> {
    const messages = await supabase
      .from("messages")
      .select(
        "*, from:from(id,name, surname, photo), to:to(id,name, surname, photo)"
      )
      .order("created_at", { ascending: true })
      .eq("chat_id", chat_id);

    return messages?.data || [];
  }

  async readMessages(ids: string[]): Promise<void> {
    await supabase.from("messages").update({ read_to: true }).in("id", ids);
  }
}

const MessageService = new MessageServiceClass();

export default MessageService;
