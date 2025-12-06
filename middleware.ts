import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Check if user has auth token (we'll check cookies)
  const hasAuthToken = request.cookies.has("accessToken");

  // Routes that require authentication
  const protectedRoutes = ["/dashboard"];

  // Routes that should redirect to dashboard if authenticated
  const authRoutes = ["/login", "/register"];

  // Redirect root to login or dashboard based on auth
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(hasAuthToken ? "/dashboard" : "/login", request.url)
    );
  }

  // If trying to access protected route without auth token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!hasAuthToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If trying to access auth routes while authenticated
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (hasAuthToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
