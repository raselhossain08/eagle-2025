import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/hub", "/profile", "/admin"];
const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  if (!pathname) {
    console.error("No pathname defined in request");
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to hub if logged in and on a public route
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/hub", request.url));
  }

  // Handle protected routes
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Role-based access control (simplified without token verification)
    if (pathname.startsWith("/admin")) {
      // Assuming role is not checked without verification; redirect if no admin role is assumed
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/hub/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
  runtime: "nodejs", // Explicitly enforce Node.js runtime
};
