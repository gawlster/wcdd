import { useIsMobile } from "@/hooks/useIsMobile"
import { CSSProperties, ReactNode } from "react"

type Size = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl"
const fontSizes = {
    sm: {
        mobile: "10px",
        default: "12px",
    },
    md: {
        mobile: "12px",
        default: "14px",
    },
    lg: {
        mobile: "14px",
        default: "16px",
    },
    xl: {
        mobile: "18px",
        default: "22px",
    },
    xxl: {
        mobile: "48px",
        default: "60px",
    },
    xxxl: {
        mobile: "72px",
        default: "105px",
    },
}

export function Text({
    children,
    size,
    style,
    onClick,
}: {
    children: ReactNode
    size: Size
    style?: CSSProperties
    onClick?: () => void
}) {
    const isMobile = useIsMobile()
    return (
        <div
            style={{
                fontSize: isMobile
                    ? fontSizes[size].mobile
                    : fontSizes[size].default,
                ...style,
            }}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
