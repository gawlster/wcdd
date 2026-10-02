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
}
