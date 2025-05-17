import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";

export async function POST(req : Request) {

    const { url, company_name, execution_time } = await req.json();

    const { error } = await supabaseData.from("register_url").insert(
        {
            url : url,
            company_name : company_name, 
            execution_time : execution_time
        });

    if(error) throw new Error(`error message ${error}`);

    return NextResponse.json({ insert : true });
}
