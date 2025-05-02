import { supabaseData } from "@/app/config/connection";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
  const { email, password} = await req.json();
  
  const { error } = await supabaseData.auth.signInWithPassword({email, password});

  if(error) throw new Error(`error message ${error}`);

  return NextResponse.json({ redirecttopass : true })
}