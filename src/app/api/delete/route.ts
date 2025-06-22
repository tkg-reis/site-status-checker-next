import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";

export async function DELETE(req : Request) {

    const { id } = await req.json();

    const { error } = await supabaseData.from("register_url").delete().eq('id' , id);

    if(error) throw new Error(`error message ${error.message}`);

    return NextResponse.json({ delete : true });
}
