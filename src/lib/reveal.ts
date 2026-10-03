import type { CSSProperties } from "react"

/** Position in a staggered scroll reveal; see `.reveal-*` in globals.css */
export function revealOrder(i: number) {
    return { "--reveal-i": i } as CSSProperties
}
