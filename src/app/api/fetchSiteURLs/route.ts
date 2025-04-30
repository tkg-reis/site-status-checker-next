import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";

export async function GET() {
    // TODO: ダミーをとりあえず作成しておく
    const { data, error } = await supabaseData.from("register_url").select();
    if(error) {
        console.log(error);
        return NextResponse.json({ error: `Error fetching ${error}`});
    }
    return NextResponse.json(data);
}