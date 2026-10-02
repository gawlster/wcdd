import { env } from "./env"

/** Sends one SMS through Twilio's REST API. Throws if Twilio rejects it. */
export async function sendSms(to: string, body: string): Promise<void> {
    const sid = env.twilioAccountSid
    const res = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(`${sid}:${env.twilioAuthToken}`).toString("base64")}`,
            },
            body: new URLSearchParams({
                To: to,
                From: env.twilioFromNumber,
                Body: body,
            }),
            signal: AbortSignal.timeout(10_000),
        }
    )
    if (!res.ok) {
        throw new Error(`Twilio responded ${res.status}: ${await res.text()}`)
    }
}
