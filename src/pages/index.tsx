import Head from "next/head"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import { PackageDescriptionSection } from "@/sections/PackageDescriptionSection"
import { ContactSection } from "@/sections/ContactSection"
import { HeroSection } from "@/sections/HeroSection"
import { Footer } from "@/sections/Footer"

export const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
})

export const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-dm-sans",
    display: "swap",
})

export default function Home() {
    return (
        <>
            <Head>
                <title>West Coast Diamond Detail</title>
                <meta name="description" content="Shine like the coast!" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon-96x96.png"
                    sizes="96x96"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="West Coast Diamond Detail"
                />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <div className={`${dmSans.variable} ${cormorant.variable}`}>
                <div
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                    }}
                >
                    <HeroSection />
                    <PackageDescriptionSection />
                    <ContactSection />
                    <Footer />
                </div>
            </div>
        </>
    )
}
