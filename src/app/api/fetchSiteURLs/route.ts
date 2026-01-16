import { supabaseBrowser } from '@/app/config/connectionServer';
import { supabaseData } from './../../config/connection';
import { createClient } from '@/lib/supabase/server';
// import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation';

export async function GET() {
    const supabase = await createClient()

    const { data, error }  = await supabase.from("monitors").select(`
        id,
        name,
        url,
        created_at,
        monitor_checks (
            checked_at,
            status_code,
            error_message
        )
    `)
    .order("checked_at", { foreignTable: "monitor_checks", ascending: false })
    .limit(1, { foreignTable: "monitor_checks" });

    if(error) {
        return NextResponse.json({ error: `Error fetching ${error}`});
    }
    
    return NextResponse.json(data);
}