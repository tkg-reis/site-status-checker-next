import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
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
    const { data : { user }, error } = await supabase.auth.getUser();

    console.log(user);
    if (error || !user) {
    return NextResponse.json({ error: error?.message || 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(user);
}