"use client"

import { useEffect, useRef } from "react"

/** A soft light that follows the cursor over its parent, like inspecting paint under a work lamp. Mouse only. */
export function HeroSpotlight() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const light = ref.current
        const area = light?.parentElement
        if (
            !light ||
            !area ||
            !matchMedia(
                "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
            ).matches
        ) {
            return
        }
        let frame = 0
        const onMove = (e: PointerEvent) => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                const rect = area.getBoundingClientRect()
                light.style.setProperty("--x", `${e.clientX - rect.left}px`)
                light.style.setProperty("--y", `${e.clientY - rect.top}px`)
                light.style.opacity = "1"
            })
        }
        const onLeave = () => {
            cancelAnimationFrame(frame)
            light.style.opacity = "0"
        }
        area.addEventListener("pointermove", onMove)
        area.addEventListener("pointerleave", onLeave)
        return () => {
            cancelAnimationFrame(frame)
            area.removeEventListener("pointermove", onMove)
            area.removeEventListener("pointerleave", onLeave)
        }
    }, [])

    return (
        <div
            ref={ref}
            aria-hidden
            className="hero-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700"
        />
    )
}
