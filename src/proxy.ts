import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/proxy"

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area", charset="UTF-8"',
    },
  });
}

export async function proxy(request: NextRequest) {
    
  const { pathname } = request.nextUrl;
  const bypass =
  pathname.startsWith("/_next") ||
  pathname === "/favicon.ico" ||
  pathname === "/robots.txt" ||
  pathname === "/sitemap.xml";

  if (bypass) {
    return NextResponse.next();
  }

  const BASIC_USER = process.env.BASIC_AUTH_USER;
  const BASIC_PASS = process.env.BASIC_AUTH_PASS;

  if (!BASIC_USER || !BASIC_PASS) {
    return unauthorized();
  }

  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  const base64 = auth.slice("Basic ".length);
  let decoded = "";
  try {
    decoded = atob(base64);
  } catch {
    return unauthorized();
  }

  const idx = decoded.indexOf(":");
  if (idx < 0) return unauthorized();

  const user = decoded.slice(0, idx);
  const pass = decoded.slice(idx + 1);

  if (user !== BASIC_USER || pass !== BASIC_PASS) {
    return unauthorized();
  }
  
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}