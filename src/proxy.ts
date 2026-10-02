import { NextRequest, NextResponse } from "next/server"
import { isValidBasicAuth } from "@/lib/auth"

export function proxy(req: NextRequest) {
    if (isValidBasicAuth(req.headers.get("authorization"))) {
        return NextResponse.next()
    }
    return new NextResponse("Authentication required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Protected Area"',
        },
    })
}

export const config = {
    matcher: ["/admin/:path*"],
}
