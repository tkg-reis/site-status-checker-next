import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req : Request) {
  const { email, password } = await req.json();

  // const supabase = createClient()
  const cookieStore = await cookies();
  const response = NextResponse.json({ ok: true });

    const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!, // あなたの env 名に合わせる
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            // ここが超重要：ブラウザへ Set-Cookie を返す
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );
  
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if(error || !data.session) throw new Error(`error message ${error}`);

	// トップページのlayoutを再検証
  // revalidatePath('/', 'layout')
  // トップページへリダイレクト
  // redirect('/')

  return response;
}