import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";

export async function GET() {
    // auth apiを使用してuserを取得して画面の右上に表示する。
    const { data, error } = await supabaseData.from("site_user_table").select();
    if(error) {
        console.log(error);
        return NextResponse.json({ error: `Error fetching ${error}`});
    }
    return NextResponse.json(data);
}