import { connectionServer } from "@/app/config/connectionServer";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = connectionServer();
    const { data : { user }, error } = await supabase.auth.getUser();

    console.log(user);
    if (error || !user) {
    return NextResponse.json({ error: error?.message || 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(user);
}