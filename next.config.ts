import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        // Pin the project root so a stray lockfile in a parent directory isn't mistaken for it
        root: import.meta.dirname,
    },
}

export default nextConfig
