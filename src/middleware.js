import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("tokenLogin")?.value;
  const url = req.nextUrl.clone();
  if (url.pathname === "/auth/signin" && token) {
    return NextResponse.redirect(new URL("/users", req.url));
  }
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/users", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!auth|api|_next/static|_next/image|favicon.ico).*)"], // Exclude specific paths
};
