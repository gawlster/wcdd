"use client"

import { useEffect } from "react"

/**
 * Adds `data-revealed` to each `[data-reveal]` element the first time it scrolls into view.
 * The `.reveal-*` classes in globals.css do the animating. They only hide anything once this
 * has run and set `data-reveal-ready` on <html>, so the page still shows if JavaScript doesn't.
 */
export function RevealOnScroll() {
    useEffect(() => {
        const root = document.documentElement
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    // Also reveal anything already scrolled past, e.g. after a reload mid-page
                    if (
                        entry.isIntersecting ||
                        entry.boundingClientRect.top < 0
                    ) {
                        reveal(entry.target)
                    }
                }
            },
            { rootMargin: "0px 0px -12% 0px" }
        )
        const reveal = (el: Element) => {
            el.setAttribute("data-revealed", "")
            observer.unobserve(el)
        }
        for (const el of document.querySelectorAll(
            "[data-reveal]:not([data-revealed])"
        )) {
            // Anything already on screen (or above it) stays put rather than vanishing to animate in
            if (el.getBoundingClientRect().top < window.innerHeight) reveal(el)
            else observer.observe(el)
        }
        root.setAttribute("data-reveal-ready", "")
        return () => {
            observer.disconnect()
            root.removeAttribute("data-reveal-ready")
        }
    }, [])
    return null
}
