import { useScroll } from "@/contexts/ScrollContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { Text } from "@/shared-components/Text"
import Image from "next/image"
import { useEffect, useRef } from "react"

export function Footer() {
    const ref = useRef<HTMLDivElement>(null)
    const { register, scrollTo } = useScroll()
    useEffect(() => {
        register("footer", ref)
    }, [register])
    const isMobile = useIsMobile()
    return (
        <div
            ref={ref}
            style={{
                width: "100%",
                paddingBlock: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingInline: "40px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1100px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        gap: "44px",
                        justifyContent: "space-between",
                        flexDirection: isMobile ? "column" : "row",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            flex: 1,
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: isMobile ? "60px" : "80px",
                                aspectRatio: "1",
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
                        <Text
                            size="md"
                            style={{
                                color: "var(--color-faded-text)",
                            }}
                        >
                            Premium mobile auto detailing. We bring showroom
                            quality to your driveway.
                        </Text>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            flex: 1,
                        }}
                    >
                        <Text
                            size="xl"
                            style={{
                                color: "var(--color-brand-orange)",
                                fontFamily: "var(--font-cormorant)",
                                fontWeight: 400,
                                letterSpacing: "0.7px",
                            }}
                        >
                            Services
                        </Text>
                        <Text
                            size="md"
                            style={{
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                            onClick={() => {
                                scrollTo("hightide")
                            }}
                        >
                            High Tide Treatment
                        </Text>
                        <Text
                            size="md"
                            style={{
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                            onClick={() => {
                                scrollTo("coastal")
                            }}
                        >
                            Coastal Cabin Revival
                        </Text>
                        <Text
                            size="md"
                            style={{
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                            onClick={() => {
                                scrollTo("shoreline")
                            }}
                        >
                            Shoreline Sweep
                        </Text>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            flex: 1,
                        }}
                    >
                        <Text
                            size="xl"
                            style={{
                                color: "var(--color-brand-orange)",
                                fontFamily: "var(--font-cormorant)",
                                fontWeight: 400,
                                letterSpacing: "0.7px",
                            }}
                        >
                            Contact
                        </Text>
                        <Text
                            size="md"
                            style={{
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                        >
                            (403) 835-1526
                        </Text>
                        <Text
                            size="md"
                            style={{
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                        >
                            westcoastdiamonddetail@gmail.com
                        </Text>
                        <Text
                            size="md"
                            style={{
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                            onClick={() => {
                                scrollTo("contact")
                            }}
                        >
                            Request a Quote
                        </Text>
                    </div>
                </div>
                <div id="spacer1" />
                <div id="spacer2" />
                <div
                    style={{
                        width: "100%",
                        height: "2px",
                        background: "var(--color-more-faded-text)",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "8px 4px",
                    }}
                >
                    <Text
                        size="md"
                        style={{
                            fontWeight: 300,
                            color: "var(--color-faded-text)",
                        }}
                    >
                        © 2026 Coastal Detailing. All rights reserved.
                    </Text>
                    <Text
                        size="md"
                        style={{
                            fontWeight: 300,
                            color: "var(--color-faded-text)",
                        }}
                    >
                        Terms & Privacy
                    </Text>
                </div>
            </div>
        </div>
    )
}
