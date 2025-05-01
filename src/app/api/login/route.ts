import { supabaseData } from "@/app/config/connection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
  console.log(req.json());
    
  const { email, password } = await req.json();

  const { error } = await supabaseData.auth.signInWithPassword({email, password});

  if(error) throw new Error(`error message ${error}`);

  return NextResponse.json({ success : true });
}