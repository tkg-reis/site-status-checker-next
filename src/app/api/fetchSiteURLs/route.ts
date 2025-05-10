import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabaseData.from("url_data").select();
    if(error) {
        return NextResponse.json({ error: `Error fetching ${error}`});
    }
    return NextResponse.json(data);
}