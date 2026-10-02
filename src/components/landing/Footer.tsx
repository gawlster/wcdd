import Image from "next/image"
import type { ReactNode } from "react"
import { packages } from "@/content/packages"
import { site } from "@/content/site"

export function Footer() {
    return (
        <footer className="flex w-full items-center justify-center px-10 py-15">
            <div className="flex w-full max-w-275 flex-col gap-8">
                <div className="flex w-full flex-col justify-between gap-11 md:flex-row">
                    <div className="flex flex-1 flex-col gap-3">
                        <div className="relative aspect-square w-15 md:w-20">
                            <Image
                                src="/images/logo-white.png"
                                alt={site.name}
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        </div>
                        <p className="type-md text-muted">{site.summary}</p>
                    </div>
                    <FooterColumn title="Services">
                        {packages.map((p) => (
                            <FooterLink key={p.id} href={`#${p.id}`}>
                                {p.title}
                            </FooterLink>
                        ))}
                    </FooterColumn>
                    <FooterColumn title="Contact">
                        <FooterLink href={site.phone.href}>
                            {site.phone.display}
                        </FooterLink>
                        <FooterLink href={`mailto:${site.email}`}>
                            {site.email}
                        </FooterLink>
                        <FooterLink href="#contact">Request a Quote</FooterLink>
                    </FooterColumn>
                </div>
                <div className="mt-16 h-0.5 w-full bg-line" />
                <p className="type-md font-light text-muted">
                    © {new Date().getFullYear()} {site.name}. All rights
                    reserved.
                </p>
            </div>
        </footer>
    )
}

function FooterColumn({
    title,
    children,
}: {
    title: string
    children: ReactNode
}) {
    return (
        <div className="flex flex-1 flex-col gap-3">
            <h2 className="type-xl font-serif font-normal tracking-[0.7px] text-accent">
                {title}
            </h2>
            {children}
        </div>
    )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a
            href={href}
            className="type-md w-fit font-light text-muted transition-colors hover:text-fg"
        >
            {children}
        </a>
    )
}
