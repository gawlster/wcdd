"use server"

import {
    contactSchema,
    getFieldErrors,
    type ContactFieldErrors,
    type ContactInput,
} from "@/lib/contact-schema"
import { getPrisma } from "@/lib/prisma"

export type SubmitContactResult =
    | { ok: true }
    | { ok: false; error?: string; fieldErrors?: ContactFieldErrors }

export async function submitContact(
    input: ContactInput
): Promise<SubmitContactResult> {
    const parsed = contactSchema.safeParse(input)
    if (!parsed.success) {
        return { ok: false, fieldErrors: getFieldErrors(parsed.error) }
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
