import type { ReactNode } from "react"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { site } from "@/content/site"
import { revealOrder } from "@/lib/reveal"
import { ContactForm } from "./ContactForm"

export function ContactSection() {
    return (
        <section
            id="contact"
            data-reveal
            className="group/contact contact-timeline relative isolate flex flex-col items-center justify-center gap-10 overflow-clip bg-surface px-6 py-25"
        >
            <div aria-hidden className="orbit-on-scroll absolute inset-0 -z-1">
                <div className="ambient-glow -top-[20vmax] -left-[25vmax]" />
                <div
                    className="ambient-glow -right-[25vmax] -bottom-[25vmax]"
                    style={{ animationDelay: "-14s" }}
                />
            </div>
            <div className="reveal-up">
                <Eyebrow both>Get in touch</Eyebrow>
            </div>
            <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity,margin,visibility] duration-700 ease-out-expo group-has-[[data-sent]]/contact:invisible group-has-[[data-sent]]/contact:-mb-10 group-has-[[data-sent]]/contact:grid-rows-[0fr] group-has-[[data-sent]]/contact:opacity-0">
                <div className="flex min-h-0 flex-col items-center gap-10 group-has-[[data-sent]]/contact:overflow-hidden">
                    <h2
                        className="reveal-up text-center font-serif type-2xl font-light"
                        style={revealOrder(1)}
                    >
                        Request a Quote
                    </h2>
                    <p
                        className="reveal-up text-center type-lg font-light text-muted"
                        style={revealOrder(2)}
                    >
                        Ready to give your vehicle the care it deserves? Reach
                        out and we&apos;ll get you scheduled
                    </p>
                </div>
            </div>
            <div
                className="reveal-up flex w-full max-w-212.5 flex-col items-center justify-center gap-8"
                style={revealOrder(3)}
            >
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
