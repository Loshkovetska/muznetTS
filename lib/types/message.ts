import { DealType } from "@/lib/types/deal";
import { UserType } from "@/lib/types/user";

type SendMessageRequestType = {
  from: string;
  to: string;
  text: string;
  files: any[];
  deal_id?: string;
};

type MessageItemType = {
  id: string;
  from: UserType;
  to: UserType;
  text: string;
  files: string[];
  created_at: string;
  read_from: boolean;
  read_to: boolean;
  empty?: boolean;
  deal?: DealType;
};

type ChatItemType = {
  id: string;
  user1: UserType;
  user2: UserType;
  last_message: string;
  created_at: string;
  count_to_read: number;
};

export type { ChatItemType, MessageItemType, SendMessageRequestType };
