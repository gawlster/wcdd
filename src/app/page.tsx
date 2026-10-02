import { ContactSection } from "@/components/landing/ContactSection"
import { Footer } from "@/components/landing/Footer"
import { Hero } from "@/components/landing/Hero"
import { Packages } from "@/components/landing/Packages"

export default function HomePage() {
    return (
        <>
            <main>
                <Hero />
                <Packages />
                <ContactSection />
            </main>
            <Footer />
        </>
    )
}
