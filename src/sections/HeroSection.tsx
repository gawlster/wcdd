import { Button } from "@/shared-components/Button"
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

export function HeroSection() {
    return (
        <div
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
                    marginInline: "100px",
                    zIndex: 2,
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
                                    width: "64px",
                                    height: "2px",
                                    backgroundColor:
                                        "var(--color-brand-orange)",
                                }}
                            />
                            <div
                                style={{
                                    color: "var(--color-brand-orange)",
                                    fontSize: "24px",
                                    lineHeight: "20px",
                                    letterSpacing: "4.2px",
                                    fontWeight: 300,
                                }}
                            >
                                MOBILE AUTO DETAILING
                            </div>
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-cormorant)",
                                fontWeight: 500,
                                fontStyle: "semibold",
                                fontSize: "105px",
                            }}
                        >
                            Showroom Quality, Delivered to Your Door
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Overlays() {
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
                    zIndex: 2,
                }}
            >
                <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{
                        color: "var(--color-brand-orange)",
                        fontSize: "18px",
                    }}
                />
            </div>
        </>
    )
}

function Navbar() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: "100px",
                paddingBlock: "20px",
                zIndex: 2,
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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "32px",
                }}
            >
                <div
                    style={{
                        cursor: "pointer",
                    }}
                >
                    Home
                </div>
                <div
                    style={{
                        cursor: "pointer",
                    }}
                >
                    Services
                </div>
                <div
                    style={{
                        cursor: "pointer",
                    }}
                >
                    Contact
                </div>
            </div>
            <Button
                text="CONTACT US"
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                onClick={() => {}}
            />
        </div>
    )
}
