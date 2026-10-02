import { useId } from "react"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type InputProps = {
    label: string
    name: string
    value: string
    onChange: (value: string) => void
    error?: string
    disabled?: boolean
    placeholder?: string
    type?: "text" | "email" | "tel"
    autoComplete?: string
    multiline?: boolean
}

const fieldClass =
    "type-lg bg-transparent px-3 py-5 text-fg outline-none placeholder:text-muted disabled:text-muted-light"

export function Input({
    label,
    name,
    value,
    onChange,
    error,
    disabled,
    placeholder,
    type = "text",
    autoComplete,
    multiline = false,
}: InputProps) {
    const id = useId()
    const errorId = `${id}-error`
    const fieldProps = {
        id,
        name,
        value,
        placeholder,
        disabled,
        onChange: (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => onChange(e.target.value),
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
    }
    return (
        <div className="group flex w-full flex-col gap-1">
            <label
                htmlFor={id}
                className={`type-md ${error ? "font-semibold text-danger" : ""}`}
            >
                {label}
            </label>
            {multiline ? (
                <textarea
                    {...fieldProps}
                    rows={4}
                    className={`${fieldClass} resize-y`}
                />
            ) : (
                <input
                    {...fieldProps}
                    type={type}
                    autoComplete={autoComplete}
                    className={fieldClass}
                />
            )}
            <div
                className={`relative h-px w-full ${error ? "bg-danger" : "bg-line"}`}
            >
                <span
                    className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-200 group-focus-within:scale-x-100 ${error ? "bg-danger" : "bg-accent"}`}
                />
            </div>
            {error && (
                <p
                    id={errorId}
                    className="flex items-center gap-2 type-md text-danger"
                >
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {error}
                </p>
            )}
        </div>
    )
}
