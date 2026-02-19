import { useScroll } from "@/contexts/ScrollContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { Button } from "@/shared-components/Button"
import { Text } from "@/shared-components/Text"
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRef, useEffect } from "react"

export function HeroSection() {
    const ref = useRef<HTMLDivElement>(null)
    const { register } = useScroll()
    useEffect(() => {
        register("hero", ref)
    }, [register])
    const isMobile = useIsMobile()
    return (
        <div
            ref={ref}
            style={{
                width: "100%",
                height: "100vh",
                position: "relative",
                backgroundImage: "url('/images/white-car.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Overlays />
            <Navbar />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "915px",
                    marginInline: isMobile ? "20px" : "100px",
                    zIndex: 2,
                    pointerEvents: "none",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: isMobile ? "24px" : "64px",
                                    width: "100%",
                                    minWidth: "0",
                                    flexShrink: 1,
                                    height: isMobile ? "1px" : "2px",
                                    backgroundColor:
                                        "var(--color-brand-orange)",
                                }}
                            />
                            <Text
                                size="xl"
                                style={{
                                    color: "var(--color-brand-orange)",
                                    letterSpacing: "4.2px",
                                    fontWeight: 300,
                                    flexGrow: 1,
                                }}
                            >
                                MOBILE AUTO DETAILING
                            </Text>
                        </div>
                        <Text
                            size="xxxl"
                            style={{
                                fontFamily: "var(--font-cormorant)",
                                fontWeight: 500,
                                fontStyle: "semibold",
                            }}
                        >
                            Showroom Quality, Delivered to Your Door
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Overlays() {
    const { scrollTo } = useScroll()
    return (
        <>
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0) 0%, var(--color-brand-gray) 100%)",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--color-brand-gray)",
                    opacity: "20%",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: "32px",
                    pointerEvents: "none",
                }}
            >
                <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{
                        color: "var(--color-brand-orange)",
                        fontSize: "18px",
                        cursor: "pointer",
                        pointerEvents: "auto",
                        zIndex: 2,
                    }}
                    onClick={() => {
                        scrollTo("packages")
                    }}
                />
            </div>
        </>
    )
}

function Navbar() {
    const { scrollTo } = useScroll()
    const isMobile = useIsMobile()
    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: isMobile ? "20px" : "100px",
                paddingBlock: "20px",
                zIndex: 2,
                pointerEvents: "auto",
            }}
        >
            <div
                style={{
                    position: "relative",
                    height: "60px",
                    width: "60px",
                }}
            >
                <Image
                    src="/images/logo-white.png"
                    alt=""
                    fill
                    style={{
                        objectFit: "cover",
                    }}
                />
            </div>
            <div
                style={{
                    display: isMobile ? "none" : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "32px",
                }}
            >
                <div
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        scrollTo("hero")
                    }}
                >
                    Home
                </div>
                <div
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        scrollTo("packages")
                    }}
                >
                    Services
                </div>
                <div
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        scrollTo("contact")
                    }}
                >
                    Contact
                </div>
            </div>
            <Button
                text="CONTACT US"
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                onClick={() => {
                    scrollTo("contact")
                }}
            />
        </div>
    )
}
