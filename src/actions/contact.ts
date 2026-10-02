"use server"

import { headers } from "next/headers"
import {
    contactSchema,
    getFieldErrors,
    type ContactFieldErrors,
    type ContactInput,
} from "@/lib/contact-schema"
import { getPrisma } from "@/lib/prisma"
import { isRateLimited } from "@/lib/rate-limit"

const MAX_SUBMISSIONS = 5
const WINDOW_MS = 10 * 60 * 1000

export type SubmitContactResult =
    | { ok: true }
    | { ok: false; error?: string; fieldErrors?: ContactFieldErrors }

/**
 * @param honeypot Value of a field hidden from people. Bots that fill every input set it,
 * and get a fake success so they don't learn to skip it.
 */
export async function submitContact(
    input: ContactInput,
    honeypot = ""
): Promise<SubmitContactResult> {
    if (honeypot) return { ok: true }

    const parsed = contactSchema.safeParse(input)
    if (!parsed.success) {
        return { ok: false, fieldErrors: getFieldErrors(parsed.error) }
    }

    const h = await headers()
    // Only trustworthy behind a proxy that sets it (e.g. Vercel); otherwise clients can spoof it
    const ip =
        h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        h.get("x-real-ip") ||
        "unknown"
    if (isRateLimited(`contact:${ip}`, MAX_SUBMISSIONS, WINDOW_MS)) {
        return {
            ok: false,
            error: "You've sent several messages recently. Please wait a few minutes, or call or email us directly.",
        }
    }

    try {
        await getPrisma().contactSubmission.create({ data: parsed.data })
    } catch (e) {
        console.error("Failed to save contact submission", e)
        return {
            ok: false,
            error: "Something went wrong. Try again later or contact us for assistance.",
        }
    }
    return { ok: true }
}
