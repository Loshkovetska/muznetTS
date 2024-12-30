import { AddCommentType, CommentType } from "@/lib/types/comment";
import { supabase } from "@/lib/utils/supabase";

class CommentServiceClass {
  constructor() {}

  async getPostComments(post_id: string): Promise<CommentType[]> {
    const comments = await supabase
      .from("comments")
      .select(
        "created_at, id, post_id,text,likes_count, user:user_id(id, name, surname, user_name, photo), comment:comment_id(id, post_id,text, user:user_id(id, name, surname, user_name, photo), created_at, likes_count)"
      )
      .eq("post_id", post_id);

    return (comments?.data || []) as any;
  }

  async postComment(args: AddCommentType): Promise<CommentType> {
    const comment = await supabase
      .from("comments")
      .insert(args)
      .select(
        "created_at, id, post_id,text,likes_count, user:user_id(id, name, surname, user_name, photo), comment:comment_id(id, post_id,text, user:user_id(id, name, surname, user_name, photo), created_at, likes_count)"
      )
      .single();

    if (comment.error) throw new Error("Error");

    return comment.data as any;
  }
}

const CommentService = new CommentServiceClass();

export { CommentService };
