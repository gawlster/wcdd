import type { ReactNode } from "react"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { site } from "@/content/site"
import { ContactForm } from "./ContactForm"

export function ContactSection() {
    return (
        <section
            id="contact"
            className="flex flex-col items-center justify-center gap-10 bg-surface px-6 py-25"
        >
            <Eyebrow both>Get in touch</Eyebrow>
            <h2 className="text-center font-serif type-2xl font-light">
                Request a Quote
            </h2>
            <p className="text-center type-lg font-light text-muted">
                Ready to give your vehicle the care it deserves? Reach out and
                we&apos;ll get you scheduled
            </p>
            <div className="flex w-full max-w-212.5 flex-col items-center justify-center gap-8">
                <ContactForm />
                <div className="h-px w-full bg-line" />
                <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-7">
                    <ContactDetail label="PHONE">
                        <a href={site.phone.href} className="hover:text-accent">
                            {site.phone.display}
                        </a>
                    </ContactDetail>
                    <ContactDetail label="EMAIL">
                        <a
                            href={`mailto:${site.email}`}
                            className="hover:text-accent"
                        >
                            {site.email}
                        </a>
                    </ContactDetail>
                    <ContactDetail label="HOURS">
                        <span className="flex flex-col items-center">
                            <span>{site.hours}</span>
                            <span className="text-muted">
                                ({site.hoursNote})
                            </span>
                        </span>
                    </ContactDetail>
                </div>
            </div>
        </section>
    )
}

function ContactDetail({
    label,
    children,
}: {
    label: string
    children: ReactNode
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <span className="type-sm font-light tracking-[0.6px] text-accent">
                {label}
            </span>
            <span className="type-lg font-light">{children}</span>
        </div>
    )
}
