import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Let phones and other devices on the local network load the dev server's scripts (by
    // network IP or Bonjour name); otherwise the page renders but never becomes interactive.
    // Dev only: production ignores this.
    allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
    turbopack: {
        // Pin the project root so a stray lockfile in a parent directory isn't mistaken for it
        root: import.meta.dirname,
    },
}

export default nextConfig
