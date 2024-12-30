import { supabase } from "@/lib/utils/supabase";

class LikeServiceClass {
  constructor() {}

  async isPostLiked(args: {
    post_id: string;
    user_id: string;
  }): Promise<boolean> {
    const like = await supabase
      .from("likes")
      .select()
      .eq("user_id", args.user_id)
      .eq("post_id", args.post_id)
      .single();

    if (like.error) throw new Error("Error");

    return !!like.data;
  }

  async isCommentLiked(args: {
    comment_id: string;
    user_id: string;
  }): Promise<boolean> {
    const like = await supabase
      .from("likes")
      .select()
      .eq("user_id", args.user_id)
      .eq("comment_id", args.comment_id)
      .single();

    if (like.error) throw new Error("Error");

    return !!like.data;
  }

  async reactPost(args: {
    post_id: string;
    user_id: string;
  }): Promise<boolean> {
    const likes = await supabase
      .from("likes")
      .insert({ ...args, comment_id: null })
      .select("post:post_id(*)")
      .single();

    if (likes.error) throw new Error("Error");

    const res = await supabase
      .from("posts")
      .update({
        info: {
          ...(likes.data.post as any).info,
          likes: (likes.data.post as any).info.likes + 1,
        },
      })
      .eq("id", args.post_id);

    if (res.error) throw new Error("Error");

    return true;
  }

  async unlikePost(args: {
    post_id: string;
    user_id: string;
  }): Promise<boolean> {
    const likes = await supabase
      .from("likes")
      .delete()
      .eq("post_id", args.post_id)
      .eq("user_id", args.user_id);

    if (likes.error) throw new Error("Error");
    const post = await supabase
      .from("posts")
      .select("info")
      .eq("id", args.post_id)
      .single();

    if (post?.data) {
      const res = await supabase
        .from("posts")
        .update({
          info: {
            ...post.data?.info,
            likes: post.data?.info.likes - 1,
          },
        })
        .eq("id", args.post_id);

      if (res.error) throw new Error("Error");
    }

    return true;
  }

  async reactComment(args: {
    comment_id: string;
    user_id: string;
  }): Promise<boolean> {
    const likes = await supabase
      .from("likes")
      .insert({ ...args, post_id: null })
      .select("comment:comment_id(likes_count)")
      .single();

    if (likes.error) throw new Error("Error");

    const res = await supabase
      .from("comments")
      .update({
        likes_count: (likes.data.comment as any).likes_count + 1,
      })
      .eq("id", args.comment_id);

    if (res.error) throw new Error("Error");

    return true;
  }

  async unlikeComment(args: {
    comment_id: string;
    user_id: string;
  }): Promise<boolean> {
    const likes = await supabase
      .from("likes")
      .delete()
      .eq("comment_id", args.comment_id)
      .eq("user_id", args.user_id);

    if (likes.error) throw new Error("Error");
    const comment = await supabase
      .from("comments")
      .select("likes_count")
      .eq("id", args.comment_id)
      .single();

    if (comment?.data) {
      const res = await supabase
        .from("comments")
        .update({
          likes_count: comment.data.likes_count - 1,
        })
        .eq("id", args.comment_id);

      if (res.error) throw new Error("Error");
    }

    return true;
  }
}

const LikeService = new LikeServiceClass();

export { LikeService };
