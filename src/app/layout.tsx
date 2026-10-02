import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "./globals.css"
import { site } from "@/content/site"

// Font Awesome's CSS is imported above so icons are styled in the server HTML
config.autoAddCss = false

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
})

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-dm-sans",
    display: "swap",
})

export const metadata: Metadata = {
    title: {
        default: site.name,
        template: `%s · ${site.name}`,
    },
    description: site.tagline,
    icons: {
        icon: [
            { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
        shortcut: "/favicon.ico",
        apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    },
    appleWebApp: { title: site.name },
    manifest: "/site.webmanifest",
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            className={`${dmSans.variable} ${cormorant.variable}`}
        >
            <body>{children}</body>
        </html>
    )
}
