import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" })
    }
    try {
        const submissions = await prisma?.formSubmission.findMany()
        return res.status(200).json({ submissions })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Failed to get form submissions" })
    }
}
