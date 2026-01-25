import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }
    const { name, email, phone, message } = req.body
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: "Invalid body" })
    }
    try {
        const formSubmission = await prisma.formSubmission.create({
            data: {
                name,
                email,
                phone,
                message,
            },
        })
        return res.status(200).json({ id: formSubmission.id })
    } catch (e) {
        console.log(e)
        return res
            .status(500)
            .json({ error: "Failed to create form submission" })
    }
}
