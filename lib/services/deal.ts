import { DealType } from "@/lib/types/deal";
import { supabase } from "@/lib/utils/supabase";

class DealServiceClass {
  constructor() {}

  async getDeals(user_id: string): Promise<DealType[]> {
    try {
      const deals = await supabase
        .from("deals")
        .select("*, ad:ads_id(*), performer:performer_id(id, name, surname)")
        .eq("ad.user_id", user_id);

      if (!deals?.data) throw new Error("No Deals");

      return deals.data;
    } catch (e) {
      console.log(e);
    }
    return [];
  }

  async getDeal(
    user_id: string,
    performer_id: string
  ): Promise<DealType | null> {
    const deal = await supabase
      .from("deals")
      .select("*, ad:ads_id(*), performer:performer_id(id, name, surname)")
      .eq("ad.user_id", user_id)
      .eq("performer_id", performer_id)
      .eq("status", "active")
      .single();

    return deal?.data || null;
  }

  async createDeal(args: {
    ads_id: string;
    performer_id: string;
  }): Promise<DealType> {
    const deal = await supabase.from("deals").insert(args).select().single();

    if (!deal?.data) throw new Error("No Deal");
    return deal.data;
  }

  async getDealsByParams(
    user_id?: string,
    performer_id?: string
  ): Promise<DealType[] | undefined> {
    try {
      let request = supabase
        .from("deals")
        .select("*, ad:ads_id(*), performer:performer_id(id, name, surname)");

      if (user_id && performer_id) {
        request = request
          .eq("ad.user_id", user_id)
          .eq("performer_id", performer_id);
      }

      if (user_id && !performer_id) {
        request = request.eq("ad.user_id", user_id);
      }

      if (!user_id && performer_id) {
        request = request.eq("performer_id", performer_id);
      }

      const deals = await request;
      if (!deals.data) throw new Error("No Deal");
      return deals.data;
    } catch (e) {
      console.log(e);
    }
  }

  async updateOfferStatus(args: {
    deal_id: string;
    status: DealType["offer_status"];
  }): Promise<any> {
    const deal = await supabase
      .from("deals")
      .update({ offer_status: args.status })
      .eq("id", args.deal_id)
      .select()
      .single();

    if (!deal?.data) throw new Error("No Deal");
    return deal.data;
  }

  async updateStatus(id: string) {
    try {
      const user = await supabase
        .from("deals")
        .update({ status: "closed" })
        .eq("id", id)
        .select("*, ad:ads_id(*), performer:performer_id(id, name, surname)")
        .single();

      if (!user.data) throw new Error("No Deal");
      return user.data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  async deleteDeal(deal_id: string): Promise<boolean> {
    const deletedMessage = await supabase
      .from("messages")
      .delete()
      .eq("deal_id", deal_id);

    if (!deletedMessage.error) {
      const deal = await supabase.from("deals").delete().eq("id", deal_id);
      return !deal?.error;
    }

    return false;
  }
}

const DealService = new DealServiceClass();

export { DealService };
