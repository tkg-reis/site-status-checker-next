import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("monitors").select();

    if(error) {
        return NextResponse.json({ error: `Error fetching ${error.message}`});
    }
    
    return NextResponse.json(data);
}