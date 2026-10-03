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
    const selected = options.findIndex((o) => o.value === value)
    const count = options.length
    return (
        <fieldset
            disabled={disabled}
            className="group/segmented flex w-full flex-col gap-1"
        >
            <legend className="mb-1 type-md">{label}</legend>
            <div className="relative flex gap-1 rounded border border-line p-1">
                {selected >= 0 && (
                    <span
                        aria-hidden
                        className="absolute inset-y-1 left-1 rounded bg-accent transition-[translate] duration-500 ease-out-expo group-disabled/segmented:opacity-60 motion-reduce:transition-none"
                        style={{
                            width: `calc((100% - 0.5rem - ${count - 1} * 0.25rem) / ${count})`,
                            translate: `calc(${selected} * (100% + 0.25rem)) 0`,
                        }}
                    />
                )}
                {options.map((o) => (
                    <label key={o.value} className="relative flex-1">
                        <input
                            type="radio"
                            name={name}
                            value={o.value}
                            checked={value === o.value}
                            onChange={() => onChange(o.value)}
                            className="peer sr-only"
                        />
                        <span className="block cursor-pointer rounded px-4 py-4 text-center type-lg text-muted transition-colors duration-300 peer-checked:font-medium peer-checked:text-on-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-disabled:cursor-default peer-disabled:opacity-60 hover:text-fg peer-checked:hover:text-on-accent">
                            {o.label}
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}
