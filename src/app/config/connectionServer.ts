import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

export const supabaseBrowser = async() => {
    const cookieStore = await cookies();
    return createServerClient(
        url, 
        key,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
                    } catch (error) {
                        
                    }
                }
            }
        }
    )
}