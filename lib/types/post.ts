import { UserType } from "@/lib/types/user";

type PostType = {
  id: string;
  user: UserType;
  media: string[];
  title: string;
  description: string;
  tags: string[];
  comment_on: boolean;
  share_on: boolean;
  location: string;
  created_at: string;
  info: {
    likes: number;
    comments: number;
  };
  hidden?: boolean;
};

export type { PostType };
