import { createContext, useContext, useRef, ReactNode, RefObject } from "react"

type ScrollContextType = {
    register: (id: string, ref: RefObject<HTMLElement | null>) => void
    scrollTo: (id: string) => void
}

const ScrollContext = createContext<ScrollContextType | null>(null)

export function useScroll() {
    const context = useContext(ScrollContext)
    if (!context) {
        throw new Error("useScroll must be used inside ScrollProvider")
    }
    return context
}

export function ScrollProvider({ children }: { children: ReactNode }) {
    const refs = useRef<Record<string, RefObject<HTMLElement | null>>>({})

    const register = (id: string, ref: RefObject<HTMLElement | null>) => {
        refs.current[id] = ref
    }

    const scrollTo = (id: string) => {
        const ref = refs.current[id]
        ref?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    return (
        <ScrollContext.Provider value={{ register, scrollTo }}>
            {children}
        </ScrollContext.Provider>
    )
}
