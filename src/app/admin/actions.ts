"use server"

import { revalidatePath } from "next/cache"
import { isAdminRequest } from "@/lib/auth"
import { getPrisma } from "@/lib/prisma"

export async function markResponded(id: number): Promise<{ ok: boolean }> {
    if (!(await isAdminRequest())) return { ok: false }
    if (!Number.isInteger(id) || id < 1) return { ok: false }
    try {
        // updateMany so a missing id is a count of 0 rather than a thrown error
        const { count } = await getPrisma().formSubmission.updateMany({
            where: { id },
            data: { hasResponded: true },
        })
        if (count === 0) return { ok: false }
    } catch (e) {
        console.error("Failed to mark submission as responded", e)
        return { ok: false }
    }
    revalidatePath("/admin")
    return { ok: true }
}
