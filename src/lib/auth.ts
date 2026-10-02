import { createHash, timingSafeEqual } from "node:crypto"
import { headers } from "next/headers"
import { env } from "./env"

export function isValidBasicAuth(authHeader: string | null): boolean {
    if (!authHeader) return false
    const [scheme, encoded] = authHeader.split(" ")
    if (scheme !== "Basic" || !encoded) return false
    const decoded = Buffer.from(encoded, "base64").toString("utf-8")
    // Split on the first colon only; passwords may contain colons
    const separator = decoded.indexOf(":")
    if (separator === -1) return false
    const user = decoded.slice(0, separator)
    const pass = decoded.slice(separator + 1)
    // Evaluate both so timing doesn't reveal which one was wrong
    const userOk = safeEqual(user, env.adminUsername)
    const passOk = safeEqual(pass, env.adminPassword)
    return userOk && passOk
}

/**
 * For server components and server actions. The proxy only guards requests to
 * /admin, but server actions can be invoked from any path, so each admin
 * action must check this itself.
 */
export async function isAdminRequest(): Promise<boolean> {
    return isValidBasicAuth((await headers()).get("authorization"))
}

function safeEqual(a: string, b: string): boolean {
    const hash = (s: string) => createHash("sha256").update(s).digest()
    return timingSafeEqual(hash(a), hash(b))
}
