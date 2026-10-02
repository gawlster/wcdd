import type { ReactNode } from "react"

/** Small uppercase accent label with a rule on the left (or both sides). */
export function Eyebrow({
    children,
    both = false,
}: {
    children: ReactNode
    both?: boolean
}) {
    const rule = <span aria-hidden className="h-px w-8 bg-accent md:w-12" />
    return (
        <div className="flex items-center gap-3">
            {rule}
            <span className="type-sm tracking-[3px] text-accent uppercase">
                {children}
            </span>
            {both && rule}
        </div>
    )
}
