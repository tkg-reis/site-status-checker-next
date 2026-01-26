import { createClient } from '@/lib/supabase/server';
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient()

    const { data, error }  = await supabase.from("monitor_checks").select(
        `
        id,
        checked_at,
        status_code,
        error_message,
        monitor_id,
        monitors (
            id,
            name,
            url
        )
        `
    )
    .order("checked_at", { ascending: false })
    .limit(100);

    if(error) {
        return NextResponse.json({ error: `Error fetching ${error}`});
    }
    
    return NextResponse.json(data);
}