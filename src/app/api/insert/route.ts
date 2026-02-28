import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req : Request) {

    const { url, company_name, execution_time } = await req.json();

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    const { error } = await supabase.from("monitors").insert({
        url : url,
        name : company_name, 
        execution_time : execution_time
    });

    if(error) throw new Error(`error message ${error.message}`);

    return NextResponse.json({ insert : true });
}
