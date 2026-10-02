import { useId } from "react"
import { Field, fieldClass, fieldErrorId } from "./Field"

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
        "aria-describedby": error ? fieldErrorId(id) : undefined,
    }
    return (
        <Field id={id} label={label} error={error}>
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
        </Field>
    )
}
