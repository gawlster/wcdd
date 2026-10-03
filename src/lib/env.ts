function required(name: string): string {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}

// Getters so a missing variable fails at first use, not at import (e.g. during `next build`)
export const env = {
    get databaseUrl() {
        return required("DATABASE_URL")
    },
    get adminUsername() {
        return required("ADMIN_USERNAME")
    },
    get adminPassword() {
        return required("ADMIN_PASSWORD")
    },
    /** Comma-separated E.164 numbers; empty or unset turns SMS notifications off */
    get smsNotifyTo() {
        return (process.env.SMS_NOTIFY_TO ?? "")
            .split(",")
            .map((n) => n.trim())
            .filter(Boolean)
    },
    get twilioAccountSid() {
        return required("TWILIO_ACCOUNT_SID")
    },
    get twilioAuthToken() {
        return required("TWILIO_AUTH_TOKEN")
    },
    get twilioFromNumber() {
        return required("TWILIO_FROM_NUMBER")
    },
}
