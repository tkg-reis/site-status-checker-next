import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
    const response = NextResponse.json({ ok: true });

    const supabase = await createClient()

    const { error } = await supabase.auth.signOut();

    if(error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

    
  // トップページへリダイレクト
    return response;
}