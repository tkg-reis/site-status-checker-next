import { supabaseData } from "@/app/config/connection";
import { connectionServer } from "@/app/config/connectionServer";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
  const { email, password } = await req.json();
  
  const { data, error } = await supabaseData.auth.signInWithPassword({ email, password });

  if(error || !data.session) throw new Error(`error message ${error}`);

  const supabaseServerData = connectionServer();
  await supabaseServerData.auth.setSession({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  })

  return NextResponse.json({ redirect : true })
}