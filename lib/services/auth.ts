import { uploadImage } from "@/lib/actions/upload-image";
import {
  SignInRequestType,
  SignUpRequestType,
  UpdateInfoType,
  UpdatePasswordRequestType,
  UserType,
} from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

class AuthServiceClass {
  constructor() {}
  async signIn(args: SignInRequestType): Promise<UserType | Error> {
    try {
      const user = await supabase
        .from("users")
        .select()
        .eq("email", args.email)
        .eq("password", args.password)
        .single();

      if (!user.data) throw new Error("No User");
      return user.data;
    } catch (e) {
      throw new Error("No User");
    }
  }
  async signUp(
    params: SignUpRequestType
  ): Promise<{ email: string; password: string }> {
    const copy = JSON.parse(JSON.stringify(params));
    delete copy.photo;

    const imagesUrls = await uploadImage(params.photo);

    const user = await supabase
      .from("users")
      .insert({ ...copy, photo: imagesUrls })
      .select("email, password")
      .single();

    if (!user.error) {
      return user.data;
    }
    throw new Error("Cant sign up");
  }

  async updatePassword(
    params: UpdatePasswordRequestType
  ): Promise<UserType | Error> {
    try {
      const user = await supabase
        .from("users")
        .update({ password: params.new_password })
        .eq("id", params.id)
        .select()
        .single();

      if (!user.error) {
        return user.data;
      }
      throw new Error("No user");
    } catch (e) {
      throw new Error("No user");
    }
  }
  async updateInfo(params: UpdateInfoType): Promise<UserType | null> {
    try {
      const copy = JSON.parse(JSON.stringify(params));

      delete copy.id;
      delete copy.photo;
      delete copy.old_photo;

      const user = await supabase
        .from("users")
        .select("photo,user_type")
        .eq("id", params.id)
        .single();

      if (user.data) {
        const imagesUrls = await uploadImage(params.photo);

        const user = await supabase
          .from("users")
          .update({ ...copy, photo: imagesUrls })
          .eq("id", params.id)
          .select()
          .single();
        if (!user.error) {
          return user.data;
        }
      }
    } catch (e) {
      console.log(e);
    }
    throw new Error("Cant update user");
  }

  async getUser(id: string): Promise<UserType | null> {
    const user = await supabase.from("users").select().eq("id", id).single();
    if (user.data) return user.data;

    return null;
  }
}

const AuthService = new AuthServiceClass();

export { AuthService };
