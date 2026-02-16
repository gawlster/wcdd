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
                {/* todo */}
                <link rel="icon" href="/favicon.ico" />
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
