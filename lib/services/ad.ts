import { uploadImage } from "@/lib/actions/upload-image";
import { AdType, AddUpdateAdRequestType } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

class AdServiceClass {
  constructor() {}

  async getAds(args: { id?: string; user_id?: string }): Promise<AdType[]> {
    try {
      const request = supabase.from("ads").select();
      let ads;

      if (!args.id && !args.user_id) {
        ads = await request.limit(10);
      }

      if (args.id) {
        ads = await request.limit(10).neq("id", args.id);
      }

      if (args.user_id) {
        ads = await request.eq("user_id", args.user_id);
      }

      if (!ads?.data) throw new Error("No Ads");
      return ads.data;
    } catch (e) {
      console.log(e);
    }
    return [];
  }

  async getAd(id: string): Promise<AdType | null> {
    try {
      const user = await supabase.from("ads").select().eq("id", id).single();

      if (!user.data) throw new Error("No Ad");
      return user.data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  async updateStatus(id: string) {
    try {
      const user = await supabase
        .from("ads")
        .update({ status: "closed" })
        .eq("id", id)
        .select()
        .single();

      if (!user.data) throw new Error("No Ad");
      return user.data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  async addAd(params: AddUpdateAdRequestType): Promise<AdType> {
    const imagesUrls = await uploadImage(params.photo);
    const copy = JSON.parse(JSON.stringify(params));
    delete copy.photo;
    const ad = await supabase
      .from("ads")
      .insert({ ...copy, photo: imagesUrls })
      .select()
      .single();

    if (!ad.error) {
      return ad.data;
    }
    throw new Error("Cant add ad");
  }
  async updatedAd(params: AddUpdateAdRequestType): Promise<AdType> {
    const imagesUrls = await uploadImage(params.photo);
    const copy = JSON.parse(JSON.stringify(params));
    delete copy.photo;
    delete copy.id;

    const ad = await supabase
      .from("ads")
      .update({ ...copy, photo: imagesUrls })
      .eq("id", params.id)
      .select()
      .single();

    if (!ad.error) {
      return ad.data;
    }
    throw new Error("Cant update ad");
  }

  async deleteAd(id: string): Promise<boolean> {
    const ad = await supabase.from("ads").delete().eq("id", id);
    return !!ad.data;
  }
}

const AdService = new AdServiceClass();

export default AdService;