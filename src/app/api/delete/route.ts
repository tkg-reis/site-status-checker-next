import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(req : Request) {

    const { id } = await req.json();

    const supabase = await createClient();

    const { error } = await supabase.from("monitors").delete().eq('id' , id);

    if(error) throw new Error(`error message ${error.message}`);

    return NextResponse.json({ delete : true });
}
