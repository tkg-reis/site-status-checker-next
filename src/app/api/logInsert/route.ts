import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {

    const supabase = await createClient();

    const { data: monitors, error } = await supabase.from("monitors").select("id,url,name");

    if (error) return NextResponse.json({ error: error.message });
    if (!monitors || monitors.length === 0) return NextResponse.json({ inserted: 0 });

    const results = await Promise.all(
        monitors.map(async (monitor) => {
            // リクエスト処理の中断メソッドの作成（fetch を最大10秒で諦める保険を作成する）
            const interruptExecutionController = new AbortController();
            const interruptExecutionTimer = setTimeout(() => interruptExecutionController.abort(), 10_000);

            try {
                const r = await fetch(monitor.url, {
                    method: "GET",
                    redirect: "follow",
                    signal: interruptExecutionController.signal,
                    cache: "no-store",
                });

                return {
                    monitor_id: monitor.id,
                    status_code: r.status,
                    is_up: r.ok,
                    error_message: r.ok ? "" : `HTTP ERROR : ${r.status}`,
                };
            } catch (e) {
                return {
                    monitor_id: monitor.id,
                    status_code: null,
                    is_up: false,
                    error_message: "FETCH FAILED",
                };
            } finally {
                clearTimeout(interruptExecutionTimer);
            }
        })
    );

    const { error: insErr } = await supabase.from("monitor_checks").insert(results);

    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

    return NextResponse.json({ inserted: results.length });
}
