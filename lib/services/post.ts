import { uploadImage } from "@/lib/actions/upload-image";
import {
  AddPostType,
  HideParamType,
  PostType,
  SearchPostItemType,
  TogglePostSettingsType,
} from "@/lib/types/post";
import { supabase } from "@/lib/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  async hidePost(args: HideParamType): Promise<boolean> {
    const hidden = await supabase.from("hidden_posts").insert(args);
    if (hidden.error) throw new Error("Error");
    return !hidden?.error;
  }

  async unhidePost(args: HideParamType): Promise<boolean> {
    const unhidden = await supabase
      .from("hidden_posts")
      .delete()
      .eq("user_id", args.user_id)
      .eq("post_id", args.post_id);

    if (unhidden.error) throw new Error("Error");
    return !unhidden?.error;
  }

  async addPost(args: AddPostType): Promise<PostType> {
    const imagesUrls = await uploadImage(args.media);

    const post = await supabase
      .from("posts")
      .insert({ ...args, media: imagesUrls })
      .select("*, user:user_id(*)")
      .single();

    if (post.error) throw new Error("Error");

    return post.data;
  }

  async updatePost(args: AddPostType): Promise<PostType> {
    const copy = JSON.parse(JSON.stringify(args));
    delete copy.id;
    delete copy.user_id;
    const imagesUrls = await uploadImage(args.media);

    const post = await supabase
      .from("posts")
      .update({ ...args, media: imagesUrls })
      .eq("id", args.id)
      .select("*, user:user_id(*)")
      .single();

    if (post.error) throw new Error("Error");
    return post.data;
  }

  async deletePost(post_id: string): Promise<boolean> {
    const deleted = await supabase.from("posts").delete().eq("id", post_id);

    if (deleted.error) throw new Error("Error");
    return !deleted?.error;
  }

  async toggleSettings(args: TogglePostSettingsType): Promise<boolean> {
    const post = await supabase
      .from("posts")
      .update({
        [args.toggle_name]: args.value,
      })
      .eq("id", args.post_id);

    if (post.error) throw new Error("Error");
    return !post?.error;
  }

  async getPostTags(): Promise<SearchPostItemType[]> {
    const posts = await supabase.from("posts").select("tags, id");
    const response: SearchPostItemType[] = [];

    const tags = new Set(
      posts.data?.flatMap((m) =>
        m.tags.map((t: string) => t.toLowerCase().trim())
      ) || []
    );

    Array.from(tags)?.forEach((value: string) => {
      const postsWithTags = posts.data?.filter((d) =>
        d.tags.some((t: string) => t.toLowerCase().trim() === value)
      );

      response.push({
        name: value,
        type: "tag",
        count: postsWithTags?.length || 0,
      });
    });
    return response;
  }

  async getPostLocations(): Promise<SearchPostItemType[]> {
    const posts = await supabase.from("posts").select("location, id");

    const response: SearchPostItemType[] = [];

    const locations = new Set(
      posts.data?.flatMap((m) => m.location.trim()) || []
    );

    Array.from(locations)?.forEach((value: string) => {
      const postsWithLocation = posts.data?.filter(
        (d) => d.location.trim() === value
      );

      response.push({
        name: value,
        type: "place",
        count: postsWithLocation?.length || 0,
      });
    });
    return response;
  }

  async savedSearch(): Promise<SearchPostItemType[]> {
    const list = await AsyncStorage.getItem("search");

    return JSON.parse(list || "[]");
  }

  async getPostsByFilter(args: {
    tag?: string;
    place?: string;
  }): Promise<PostType[]> {
    let request = supabase.from("posts").select("*, user:user_id(*)");

    if (args.tag) {
      request = request.contains("tags", [
        `${args.tag[0].toUpperCase()}${args.tag.slice(1)}`,
      ]);
    }

    if (args.place) {
      request = request.like("location", `%${args.place}%`);
    }

    const response = await request;
    return response?.data || [];
  }
}

const PostService = new PostServiceClass();

export { PostService };
