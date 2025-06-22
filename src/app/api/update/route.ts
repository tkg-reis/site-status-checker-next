import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";

export async function PATCH(req : Request) {

    const { id ,url, company_name, execution_time } = await req.json();

    const { error } = await supabaseData.from("register_url").update(
        {
            url : url,
            company_name : company_name, 
            execution_time : execution_time
        }).eq('id' , id);

    if(error) throw new Error(`error message ${error.message}`);

    return NextResponse.json({ patch : true });
}
