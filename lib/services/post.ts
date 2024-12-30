import { PostType } from "@/lib/types/post";
import { supabase } from "@/lib/utils/supabase";

class PostServiceClass {
  constructor() {}

  async getPosts(user_id: string): Promise<PostType[]> {
    const hiddenPosts = await supabase
      .from("hidden_posts")
      .select("post_id")
      .eq("user_id", user_id);

    if (hiddenPosts.error) throw new Error("Error");
    const ids = hiddenPosts.data.map((d) => d.post_id);
    let posts = supabase.from("posts").select("*, user:user_id(*)");

    if (ids.length) {
      posts = posts.filter("id", "not.in", `(${ids.join(",")})`);
    }

    const response = await posts;

    return response?.data || [];
  }

  async getPost(post_id: string): Promise<PostType | null> {
    const posts = await supabase
      .from("posts")
      .select("*, user:user_id(*)")
      .eq("id", post_id)
      .single();

    return posts?.data || null;
  }

  async getUserPosts(user_id: string): Promise<PostType[]> {
    const posts = await supabase
      .from("posts")
      .select("*, user:user_id(*)")
      .eq("user_id", user_id);

    return posts?.data || [];
  }

  async getLikedPosts(user_id: string): Promise<PostType[]> {
    const posts = await supabase
      .from("likes")
      .select("post:post_id(*)")
      .eq("user_id", user_id);

    return posts?.data?.flatMap((p) => p.post) || [];
  }

  async reportPost(args: {
    post_id: string;
    reason: string;
  }): Promise<boolean> {
    const reported = await supabase.from("reported_posts").insert(args);
    if (reported.error) throw new Error("Error");
    return !reported?.error;
  }

  async hidePost(args: { user_id: string; post_id: string }): Promise<boolean> {
    const hidden = await supabase.from("hidden_posts").insert(args);
    if (hidden.error) throw new Error("Error");
    return !hidden?.error;
  }

  async unhidePost(args: {
    user_id: string;
    post_id: string;
  }): Promise<boolean> {
    const unhidden = await supabase
      .from("hidden_posts")
      .delete()
      .eq("user_id", args.user_id)
      .eq("post_id", args.post_id);

    if (unhidden.error) throw new Error("Error");
    return !unhidden?.error;
  }

  async deletePost(post_id: string): Promise<boolean> {
    const deleted = await supabase.from("posts").delete().eq("id", post_id);

    if (deleted.error) throw new Error("Error");
    return !deleted?.error;
  }

  async toggleSettings(args: {
    post_id: string;
    toggle_name: string;
    value: boolean;
  }): Promise<boolean> {
    const post = await supabase
      .from("posts")
      .update({
        [args.toggle_name]: args.value,
      })
      .eq("id", args.post_id);

    if (post.error) throw new Error("Error");
    return !post?.error;
  }
}

const PostService = new PostServiceClass();

export { PostService };
