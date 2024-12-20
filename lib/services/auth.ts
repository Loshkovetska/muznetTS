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

    const imagesUrls = [];

    for (let i = 0; i < params.photo.length; i++) {
      const file = params.photo[i];

      const bucket = await supabase.storage
        .from("Images")
        .upload(file.filePath, Buffer.from(file.base64).toString("base64"), {
          contentType: file.contentType,
        });
      console.log("va", bucket);
      bucket.data && imagesUrls.push(bucket.data?.path);
    }

    const user = await supabase
      .from("users")
      .insert({ ...copy, photo: imagesUrls })
      .select("email, password")
      .single();

    if (!user.error) {
      return user.data;
    }
    console.log(user);
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
        const imagesUrls = [];

        for (let i = 0; i < params.photo.length; i++) {
          const file = params.photo[i];
          const bucket = await supabase.storage
            .from("Images")
            .upload(
              file.filePath,
              Buffer.from(file.base64).toString("base64"),
              {
                contentType: file.contentType,
              }
            );

          if (bucket.error) throw new Error("Can't upload image to Storage");

          imagesUrls.push(bucket.data.path);
        }

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
}

const AuthService = new AuthServiceClass();

export default AuthService;
