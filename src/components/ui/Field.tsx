import type { ReactNode } from "react"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const autofillClass =
    "autofill:shadow-[inset_0_0_0_1000px_var(--color-surface)] autofill:caret-fg autofill:enabled:[-webkit-text-fill-color:var(--color-fg)]"

export const fieldClass = `text-[16px] bg-transparent px-3 py-5 text-fg outline-none placeholder:text-muted disabled:text-muted-light ${autofillClass}`

/** Label, animated underline and error message shared by the form controls */
export function Field({
    id,
    label,
    error,
    children,
}: {
    id: string
    label: string
    error?: string
    children: ReactNode
}) {
    return (
        <div className="group flex w-full flex-col gap-1">
            <label
                htmlFor={id}
                className={`type-md transition-colors duration-300 ${error ? "font-semibold text-danger" : "group-focus-within:text-accent"}`}
            >
                {label}
            </label>
            {children}
            <div
                className={`relative h-px w-full ${error ? "bg-danger" : "bg-line"}`}
            >
                <span
                    className={`absolute inset-0 scale-x-0 transition-transform duration-500 ease-out-expo group-focus-within:scale-x-100 ${error ? "bg-danger" : "bg-accent"}`}
                />
            </div>
            {error && (
                <p
                    id={fieldErrorId(id)}
                    className="flex items-center gap-2 type-md text-danger"
                >
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {error}
                </p>
            )}
        </div>
    )
}

export function fieldErrorId(id: string) {
    return `${id}-error`
}
