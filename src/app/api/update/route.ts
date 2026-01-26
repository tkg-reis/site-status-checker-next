import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(req : Request) {

    const { id ,url, company_name, execution_time } = await req.json();

    const supabase = await createClient();

    const { error } = await supabase.from("monitors").update({
            url : url,
            name : company_name, 
            execution_time : execution_time
    }).eq('id' , id);

    if(error) throw new Error(`error message ${error.message}`);

    return NextResponse.json({ patch : true });
}
