import { NextRequest, NextResponse } from "next/server"

const USERNAME = process.env.ADMIN_USERNAME
const PASSWORD = process.env.ADMIN_PASSWORD

export function middleware(req: NextRequest) {
    const authHeader = req.headers.get("authorization")
    if (!authHeader) {
        return unauthorized()
    }
    const [scheme, encoded] = authHeader.split(" ")
    if (scheme !== "Basic" || !encoded) {
        return unauthorized()
    }
    const decoded = Buffer.from(encoded, "base64").toString("utf-8")
    const [user, pass] = decoded.split(":")
    if (user !== USERNAME || pass !== PASSWORD) {
        return unauthorized()
    }
    return NextResponse.next()
}

function unauthorized() {
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
