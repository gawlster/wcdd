"use server"

import { revalidatePath } from "next/cache"
import { isAdminRequest } from "@/lib/auth"
import { getPrisma } from "@/lib/prisma"

export async function markResponded(id: number): Promise<{ ok: boolean }> {
    if (!(await isAdminRequest())) return { ok: false }
    if (!Number.isInteger(id) || id < 1) return { ok: false }
    try {
        const db = getPrisma()
        // Only unresponded rows, so a second click (e.g. another tab) keeps the original time
        const { count } = await db.contactSubmission.updateMany({
            where: { id, respondedAt: null },
            data: { respondedAt: new Date() },
        })
        if (count === 0) {
            const exists = await db.contactSubmission.count({ where: { id } })
            if (exists === 0) return { ok: false }
        }
    } catch (e) {
        console.error("Failed to mark submission as responded", e)
        return { ok: false }
    }
    revalidatePath("/admin")
    return { ok: true }
}
