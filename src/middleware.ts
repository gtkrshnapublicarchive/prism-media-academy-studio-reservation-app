import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "prism_academy_local_development_secret_key_1234567890"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect technician routes
  if (pathname.startsWith("/technician")) {
    // Direct login page is allowed
    if (pathname === "/technician/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("prism_session")?.value;
    if (!token) {
      // PRD 6.3: Return generic 404 or redirect to root without disclosing route existence
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (payload.role !== "TECHNICIAN") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/technician/:path*"],
};
