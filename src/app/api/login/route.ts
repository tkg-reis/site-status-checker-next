import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req : Request) {
  const { email, password } = await req.json();

  const cookieStore = await cookies();
  const response = NextResponse.json({ ok: true });

    const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            // ブラウザへ Set-Cookie を返す
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );
  
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if(error || !data.session) throw new Error(`error message ${error}`);

  return response;
}