import { UserType } from "@/lib/types/user";

type SendMessageRequestType = {
  from: string;
  to: string;
  text: string;
  files: any[];
};

type MessageItemType = {
  id: string;
  from: UserType;
  to: UserType;
  text: string;
  files: string[];
  created_at: string;
};

type ChatItemType = {
  id: string;
  user1: UserType;
  user2: UserType;
};

export type { ChatItemType, MessageItemType, SendMessageRequestType };
