import { createClient } from "@supabase/supabase-js";

export const supabaseData = createClient(
  // コネクションの変更
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY!
);
