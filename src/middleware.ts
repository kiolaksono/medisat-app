import { NextRequest, NextResponse } from "next/server";
import { verifyWithJose } from "./helpers/jwt";

export async function middleware(request: NextRequest) {
    const whiteList = [
        "/patients/auth/login",
        "/patients/auth/register",
        "/doctors/auth/login",
        "/api/doctors/login",
        "/api/patients/login",
        "/api/patients/register",
        "/api/oauth"
    ];

    // Early return for whitelisted paths
    if (whiteList.some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // console.log(request.nextUrl.pathname, "request.nextUrl.pathname middleware ==========");

    // Get authorization from request cookies instead of server-side cookies
    const authorization = request.cookies.get("Authorization");

    // console.log(authorization, "authorization middleware ==========");
    
    // Handle unauthenticated requests
    if (!authorization) {
        // Special handling for doctors route
        if (request.nextUrl.pathname.startsWith("/doctors") && !request.nextUrl.pathname.startsWith("/doctors/auth")) {
            return NextResponse.redirect(new URL("/doctors/auth/login", request.url));
        }
        
        // For API routes, return 401
        if (request.nextUrl.pathname.startsWith("/api")) {
            return Response.json({ message: "Unauthorized middleware API" }, { status: 401 });
        }

        // For patient routes, redirect to login
        if (request.nextUrl.pathname.startsWith("/patients") && !request.nextUrl.pathname.startsWith("/patients/auth")) {
            return NextResponse.redirect(new URL("/patients/auth/login", request.url));
        }
        
        if (request.nextUrl.pathname.startsWith("/payments")) {
            return NextResponse.redirect(new URL("/patients/auth/login", request.url));
        }

        return Response.json({ message: "Unauthorized middleware" }, { status: 401 });
    }

    // Verify token type
    const [type, token] = authorization.value.split(" ");
    if (type !== "Bearer") {
        return Response.json({ message: "Invalid token type" }, { status: 401 });
    }

    try {
        // console.log(authorization, "token middleware ==========");
        // Verify token and check roles
        const verifyJose = await verifyWithJose<{ _id: string; role: string }>(token);

        // Role-based access control
        if (request.nextUrl.pathname.startsWith("/doctors") && verifyJose.role !== "doctor") {
            return NextResponse.redirect(new URL("/doctors/auth/login?unauthorized", request.url));
        }

        if (request.nextUrl.pathname.startsWith("/patients") && verifyJose.role !== "patients") {
            return NextResponse.redirect(new URL("/patients/auth/login?unauthorized", request.url));
        }

        if (request.nextUrl.pathname.startsWith("/payments") && verifyJose.role !== "patients") {
            return NextResponse.redirect(new URL("/patients/auth/login?unauthorized", request.url));
        }

        // Add user ID to headers for downstream use
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("id", verifyJose._id);
        requestHeaders.set("role", verifyJose.role);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        // console.log(error)
        return Response.json({ message: "Invalid token ERROR MIDDLEWARE" }, { status: 401 });
    }
}

// Optionally configure paths that should trigger the middleware
export const config = {
    matcher: [
        '/api/:path*',
        '/doctors/:path*',
        '/patients/:path*',
        '/payments/:path*',
    ]
};