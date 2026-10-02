import type { ComponentProps } from "react"

const buttonClass =
    "type-md inline-flex cursor-pointer items-center justify-center gap-2 rounded bg-accent px-7 py-3.5 font-medium tracking-[2.1px] text-on-accent transition-colors duration-200 hover:bg-accent-hover hover:text-on-accent-hover disabled:pointer-events-none disabled:opacity-60 md:gap-3"

export function Button({
    className = "",
    type = "button",
    ...props
}: ComponentProps<"button">) {
    return (
        <button
            type={type}
            className={`${buttonClass} ${className}`}
            {...props}
        />
    )
}

export function ButtonLink({ className = "", ...props }: ComponentProps<"a">) {
    return <a className={`${buttonClass} ${className}`} {...props} />
}
