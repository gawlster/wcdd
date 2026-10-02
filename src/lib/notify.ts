import {
    contactMethodLabels,
    packageOptions,
    type ContactInput,
} from "./contact-schema"
import { env } from "./env"
import { sendSms } from "./sms"

const MESSAGE_PREVIEW_LENGTH = 300

/**
 * Texts everyone in SMS_NOTIFY_TO about a new submission. Never throws: the
 * submission is already saved and visible in /admin, so a failed text is only logged.
 */
export async function notifyNewSubmission(submission: ContactInput) {
    const recipients = env.smsNotifyTo
    if (recipients.length === 0) return

    const body = formatSubmission(submission)
    const results = await Promise.allSettled(
        recipients.map((to) => sendSms(to, body))
    )
    results.forEach((r, i) => {
        if (r.status === "rejected") {
            console.error(`Failed to text ${recipients[i]}`, r.reason)
        }
    })
}

// Keep the template plain ASCII: one non-GSM character (curly quote, emoji)
// switches the whole text to UCS-2 and more than doubles the segment count
function formatSubmission(s: ContactInput) {
    const pkg =
        packageOptions.find((o) => o.value === s.packageId)?.label ??
        s.packageId
    const message =
        s.message.length > MESSAGE_PREVIEW_LENGTH
            ? `${s.message.slice(0, MESSAGE_PREVIEW_LENGTH)}...`
            : s.message
    return [
        `New quote request from ${s.name}`,
        `Package: ${pkg}`,
        `Prefers: ${contactMethodLabels[s.preferredContact]}`,
        `Phone: ${s.phone}`,
        `Email: ${s.email}`,
        "",
        message,
    ].join("\n")
}
