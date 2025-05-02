import { supabaseData } from "@/app/config/connection";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req : Request) {
  
    const {username, email, password} = await req.json();
    
    const { error } = await supabaseData.auth.signUp({
    email,
    password,
    options : {
        data : {
          username
        },
        emailRedirectTo : process.env.NEXT_PUBLIC_REDIRECT_URL
      }
    });

  if(error) throw new Error(`error message : ${error}`);

  return NextResponse.json({ success : true, error : error });
}