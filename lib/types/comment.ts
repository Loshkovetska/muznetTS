import { UserType } from "@/lib/types/user";

type CommentType = {
  id: string;
  post_id: string | null;
  user: Partial<UserType>;
  text: string;
  comment: CommentType | null;
  created_at: string;
  likes_count: number;
};

type AddCommentType = {
  text: string;
  user_id: string;
  post_id?: string;
  comment_id?: string;
};

export type { AddCommentType, CommentType };
