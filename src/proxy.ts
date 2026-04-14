import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const ProtectedRoute = [, "/checkout", "/allorders", "/profile", "/category"];
// انا مش حاطط الكارت عشان الديمو شغال كده <===
const AuthRoute = ["/login", "/register"];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET, secureCookie: process.env.NODE_ENV === "production" });

    if (!token && ProtectedRoute.some((route) => pathname.startsWith(route))) return NextResponse.redirect(new URL('/login', request.nextUrl));
    if (token && AuthRoute.some((route) => pathname.startsWith(route))) return NextResponse.redirect(new URL('/', request.nextUrl));

    return NextResponse.next();
}

export const config = {
    matcher: ["/cart/:path*", "/checkout/:path*", "/allorders/:path*", "/profile/:path*", "/category/:path*", "/brand/:path*", "/product/:path*", "/login", "/register"]
};