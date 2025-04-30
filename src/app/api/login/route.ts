import { supabaseData } from "@/app/config/connection";
import { type NextApiResponse } from "next";

export async function GET(res : NextApiResponse) {
  // 型を変更しておく、auth apiに変更する。
  const { data, error } = await supabaseData.from("site_user_table").select();
  if (error) {
    console.log(error);
    return res.json({ error : `Error fetching ${error}`});
  }
  return res.json(data);
}
