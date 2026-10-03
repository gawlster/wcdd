import { ContactSection } from "@/components/landing/ContactSection"
import { Footer } from "@/components/landing/Footer"
import { Hero } from "@/components/landing/Hero"
import { Packages } from "@/components/landing/Packages"
import { SiteNav } from "@/components/landing/SiteNav"
import { RevealOnScroll } from "@/components/motion/RevealOnScroll"

export default function HomePage() {
    return (
        <>
            <SiteNav />
            <main>
                <Hero />
                <Packages />
                <ContactSection />
            </main>
            <Footer />
            <RevealOnScroll />
        </>
    )
}
