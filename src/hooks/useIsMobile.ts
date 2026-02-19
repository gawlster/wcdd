import { useEffect, useState } from "react"

export function useIsMobile(breakpoint: number = 768): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        if (typeof window === "undefined") return
        const element = document.documentElement
        const update = () => {
            const width = element.clientWidth
            setIsMobile(width <= breakpoint)
        }
        update()
        const observer = new ResizeObserver(() => {
            update()
        })
        observer.observe(element)
        return () => {
            observer.disconnect()
        }
    }, [breakpoint])

    return isMobile
}
