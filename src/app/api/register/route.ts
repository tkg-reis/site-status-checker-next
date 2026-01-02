// import { supabaseBrowser } from '@/app/config/connectionServer';
// import { supabaseData } from "@/app/config/connection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req : Request) {
  
    const {username, email, password} = await req.json();

    const supabase = await createClient();
    
    const { error } = await supabase.auth.signUp({
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

  // return NextResponse.json({ success : true, error : error });

  	// トップページのlayoutを再検証
  revalidatePath('/', 'layout')
  // トップページへリダイレクト
  redirect('/')
}