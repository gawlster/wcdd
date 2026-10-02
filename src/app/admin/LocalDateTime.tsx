"use client"

import { useSyncExternalStore } from "react"

const noopSubscribe = () => () => {}

/** Formats in the viewer's timezone; the server doesn't know it, so it renders empty there. */
export function LocalDateTime({ value }: { value: Date }) {
    const isClient = useSyncExternalStore(
        noopSubscribe,
        () => true,
        () => false
    )
    return (
        <time dateTime={value.toISOString()}>
            {isClient ? value.toLocaleString() : ""}
        </time>
    )
}
