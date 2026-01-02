import { supabaseBrowser } from '@/app/config/connectionServer';
import { supabaseData } from './../../config/connection';
import { createClient } from '@/lib/supabase/server';
// import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation';

export async function GET() {
    const supabase = await createClient()
    const { data, error }  = await supabase.from("url_data").select();
    if(error) {
        return NextResponse.json({ error: `Error fetching ${error}`});
    }
    return NextResponse.json(data);
}