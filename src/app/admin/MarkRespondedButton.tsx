"use client"

import { useState, useTransition } from "react"
import { markResponded } from "./actions"

export function MarkRespondedButton({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition()
    const [failed, setFailed] = useState(false)
    return (
        <>
            <button
                type="button"
                disabled={isPending}
                onClick={() =>
                    startTransition(async () => {
                        const { ok } = await markResponded(id)
                        setFailed(!ok)
                    })
                }
                className="cursor-pointer rounded border border-muted px-2 py-1 hover:bg-line disabled:cursor-wait disabled:opacity-60"
            >
                {isPending ? "Saving..." : "Mark as responded"}
            </button>
            {failed && (
                <p className="mt-1 text-danger">
                    There was an error while marking this submission as
                    responded to.
                </p>
            )}
        </>
    )
}
