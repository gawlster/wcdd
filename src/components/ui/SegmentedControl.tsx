type SegmentedControlProps<T extends string> = {
    label: string
    name: string
    value: T
    onChange: (value: T) => void
    options: { value: T; label: string }[]
    disabled?: boolean
}

/** Pick-one switcher; radio inputs underneath, so arrow keys and screen readers work as usual */
export function SegmentedControl<T extends string>({
    label,
    name,
    value,
    onChange,
    options,
    disabled,
}: SegmentedControlProps<T>) {
    return (
        <fieldset disabled={disabled} className="flex w-full flex-col gap-1">
            <legend className="mb-1 type-md">{label}</legend>
            <div className="flex gap-1 rounded border border-line p-1">
                {options.map((o) => (
                    <label key={o.value} className="flex-1">
                        <input
                            type="radio"
                            name={name}
                            value={o.value}
                            checked={value === o.value}
                            onChange={() => onChange(o.value)}
                            className="peer sr-only"
                        />
                        <span className="block cursor-pointer rounded px-4 py-4 text-center type-lg text-muted transition-colors duration-200 peer-checked:bg-accent peer-checked:font-medium peer-checked:text-on-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-disabled:cursor-default peer-disabled:opacity-60 hover:text-fg peer-checked:hover:text-on-accent">
                            {o.label}
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}
