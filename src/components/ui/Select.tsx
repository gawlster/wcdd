import { useId } from "react"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Field, fieldClass, fieldErrorId } from "./Field"

type SelectProps = {
    label: string
    name: string
    value: string
    onChange: (value: string) => void
    options: { value: string; label: string }[]
    /** Shown while `value` is empty; can't be picked again once a real option is chosen */
    placeholder: string
    error?: string
    disabled?: boolean
}

export function Select({
    label,
    name,
    value,
    onChange,
    options,
    placeholder,
    error,
    disabled,
}: SelectProps) {
    const id = useId()
    return (
        <Field id={id} label={label} error={error}>
            <div className="relative">
                <select
                    id={id}
                    name={name}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value)}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? fieldErrorId(id) : undefined}
                    className={`${fieldClass} w-full cursor-pointer appearance-none pr-10 scheme-dark disabled:cursor-default ${value ? "" : "text-muted"}`}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((o) => (
                        <option
                            key={o.value}
                            value={o.value}
                            className="bg-surface text-fg"
                        >
                            {o.label}
                        </option>
                    ))}
                </select>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
                />
            </div>
        </Field>
    )
}
