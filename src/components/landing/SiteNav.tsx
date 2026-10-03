"use client"

import Image from "next/image"
import {
    useEffect,
    useLayoutEffect,
    useState,
    useSyncExternalStore,
} from "react"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ButtonLink } from "@/components/ui/Button"
import { site } from "@/content/site"
import { revealOrder } from "@/lib/reveal"

const links = [
    { href: "#home", label: "Home" },
    { href: "#packages", label: "Services" },
    { href: "#contact", label: "Contact" },
]

const MENU_ID = "mobile-menu"

export function SiteNav() {
    const scrolled = useSyncExternalStore(
        subscribeToScroll,
        () => window.scrollY > 24,
        () => false
    )
    const [open, setOpen] = useState(false)
    const solid = scrolled || open

    // Freeze the page behind the open menu. A layout effect, so the lock is gone before a
    // tapped link's default scroll happens.
    useLayoutEffect(() => {
        if (!open) return
        const root = document.documentElement
        root.style.overflow = "hidden"
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
        document.addEventListener("keydown", onKey)
        return () => {
            root.style.overflow = ""
            document.removeEventListener("keydown", onKey)
        }
    }, [open])

    // The menu is mobile only; don't leave it open (and the page locked) after a resize to desktop
    useEffect(() => {
        const desktop = matchMedia("(min-width: 48rem)")
        const onChange = () => desktop.matches && setOpen(false)
        desktop.addEventListener("change", onChange)
        return () => desktop.removeEventListener("change", onChange)
    }, [])

    return (
        <nav className="fixed inset-x-0 top-0 z-50">
            <div
                className={`nav-enter relative z-1 flex items-center justify-between border-b px-5 transition-[background-color,border-color,padding,backdrop-filter] duration-500 ease-out-expo md:px-25 ${
                    solid
                        ? "border-line/60 bg-bg/75 py-3 backdrop-blur-md"
                        : "border-transparent py-5"
                }`}
            >
                <a
                    href="#home"
                    onClick={() => setOpen(false)}
                    className={`relative transition-[width,height] duration-500 ease-out-expo ${scrolled ? "size-12" : "size-15"}`}
                >
                    <Image
                        src="/images/logo-white.png"
                        alt={site.name}
                        fill
                        sizes="60px"
                        className="object-cover"
                    />
                </a>
                <div className="hidden items-center justify-center gap-8 md:flex">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="relative py-1 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-out-expo hover:text-accent hover:after:scale-x-100"
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <ButtonLink
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="px-5 md:px-7"
                    >
                        CONTACT US
                        <FontAwesomeIcon icon={faArrowRight} />
                    </ButtonLink>
                    <MenuToggle open={open} onToggle={() => setOpen(!open)} />
                </div>
            </div>
            <MobileMenu open={open} onNavigate={() => setOpen(false)} />
        </nav>
    )
}

function subscribeToScroll(onChange: () => void) {
    window.addEventListener("scroll", onChange, { passive: true })
    return () => window.removeEventListener("scroll", onChange)
}

/** Two lines that cross into an X */
function MenuToggle({
    open,
    onToggle,
}: {
    open: boolean
    onToggle: () => void
}) {
    const line =
        "absolute left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-fg transition-[top,rotate] duration-500 ease-out-expo"
    return (
        <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={onToggle}
            className="relative size-11 cursor-pointer md:hidden"
        >
            <span
                className={`${line} ${open ? "top-1/2 rotate-45" : "top-[40%]"}`}
            />
            <span
                className={`${line} ${open ? "top-1/2 -rotate-45" : "top-[60%]"}`}
            />
        </button>
    )
}

function MobileMenu({
    open,
    onNavigate,
}: {
    open: boolean
    onNavigate: () => void
}) {
    // Items stagger in on open and all leave together on close
    const item = `transition-[opacity,translate] duration-700 ease-out-expo ${open ? "[transition-delay:calc(var(--reveal-i)*70ms_+_100ms)]" : "translate-y-4 opacity-0"}`
    return (
        <div
            id={MENU_ID}
            inert={!open}
            className={`fixed inset-0 flex flex-col justify-between bg-bg/95 px-5 pt-32 pb-12 backdrop-blur-sm transition-[opacity,visibility] duration-500 ease-out-expo md:hidden ${
                open ? "visible opacity-100" : "invisible opacity-0"
            }`}
        >
            <ul className="flex flex-col gap-6">
                {links.map((l, i) => (
                    <li key={l.href} className={item} style={revealOrder(i)}>
                        <a
                            href={l.href}
                            onClick={onNavigate}
                            className="flex items-center justify-between border-b border-line pb-4 font-serif text-5xl font-light transition-colors active:text-accent"
                        >
                            {l.label}
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="text-xl text-accent"
                            />
                        </a>
                    </li>
                ))}
            </ul>
            <div
                className={`flex flex-col gap-2 type-lg font-light text-muted-light ${item}`}
                style={revealOrder(links.length)}
            >
                <span className="type-sm tracking-[3px] text-accent uppercase">
                    Get in touch
                </span>
                <a href={site.phone.href}>{site.phone.display}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
        </div>
    )
}
