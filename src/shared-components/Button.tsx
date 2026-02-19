import { ReactNode } from "react"
import { Text } from "./Text"
import { useIsMobile } from "@/hooks/useIsMobile"

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
    const isMobile = useIsMobile()
    return (
        <button
            className="custom-button"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: isMobile ? "8px" : "12px",
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
            <Text
                size="md"
                style={{
                    display: "flex",
                    alignItems: "center",
                    letterSpacing: "2.1px",
                    fontWeight: 500,
                    textTransform: "capitalize",
                }}
            >
                {text}
            </Text>
            <div>{rightIcon}</div>
        </button>
    )
}
