import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Pages each role may NOT open. ADMIN sees everything.
const BLOCKED: Record<string, string[]> = {
  FIELD: ["/leads", "/proposals", "/estimates", "/invoices", "/customers", "/settings"],
  SALES: ["/invoices", "/settings/users", "/settings/import", "/settings/automations"],
  OFFICE: ["/settings/users"],
};

export default withAuth(
  function middleware(req) {
    const role = (req.nextauth.token as any)?.role as string | undefined;
    const path = req.nextUrl.pathname;
    const blocked = role ? BLOCKED[role] || [] : [];
    if (!path.startsWith("/api") && blocked.some((p) => path === p || path.startsWith(p + "/"))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  },
  { pages: { signIn: "/login" } }
);

export const config = {
  matcher: [
    "/((?!login|p/|api/auth|api/public|api/leads/webhook|api/cron|_next|favicon|manifest|icons|uploads).*)",
  ],
};
