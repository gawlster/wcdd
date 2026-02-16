import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" })
    }
    const { id: idParam } = req.query
    const id = Number(idParam)
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid query params" })
    }
    try {
        await prisma.formSubmission.update({
            where: {
                id,
            },
            data: {
                hasResponded: true,
            },
        })
        return res.status(200).json({})
    } catch {
        return res
            .status(500)
            .json({ error: "Failed to mark submission as responded" })
    }
}
