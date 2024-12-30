import { UserType } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

class UsersServiceClass {
  constructor() {}

  async getMusicians(id?: string): Promise<UserType[]> {
    try {
      let request = supabase.from("users").select().eq("user_type", "musician");

      let response;

      if (id) {
        request = request.neq("id", id);
      }

      response = await request.limit(10);

      if (!response?.data) throw new Error("No Users");
      return response.data;
    } catch (e) {
      console.log(e);
    }
    return [];
  }

  async getMusician(id: string): Promise<UserType | null> {
    try {
      const user = await supabase.from("users").select().eq("id", id).single();

      if (!user.data) throw new Error("No User");
      return user.data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }
}

const UsersService = new UsersServiceClass();

export { UsersService };
