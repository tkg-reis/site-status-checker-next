import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabaseData.from("register_url").select();
    if(error) {
        return NextResponse.json({ error: `Error fetching ${error.message}`});
    }
    return NextResponse.json(data);
}