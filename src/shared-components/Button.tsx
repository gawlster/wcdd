import { ReactNode } from "react"

export function Button({
    text,
    rightIcon,
    onClick,
    disabled = false,
}: {
    text: string
    rightIcon: ReactNode
    onClick: () => void
    disabled?: boolean
}) {
    return (
        <button
            className="custom-button"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                paddingInline: "28px",
                paddingBlock: "14px",
                borderRadius: "4px",
                cursor: "pointer",
                border: "none",
                outline: "none",
            }}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    lineHeight: "14px",
                    letterSpacing: "2.1px",
                    fontWeight: 500,
                    textTransform: "capitalize",
                }}
            >
                {text}
            </div>
            <div>{rightIcon}</div>
        </button>
    )
}
