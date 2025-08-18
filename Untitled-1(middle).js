// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Only check token presence here. Actual verification should happen later.
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Protect admin routes only
};
