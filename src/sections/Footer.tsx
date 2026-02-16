import Image from "next/image"

export function Footer() {
    return (
        <div
            style={{
                width: "100%",
                paddingBlock: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                                width: "80px",
                                height: "80px",
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
                                fontSize: "14px",
                                color: "var(--color-faded-text)",
                            }}
                        >
                            Premium mobile auto detailing. We bring showroom
                            quality to your driveway.
                        </div>
                    </div>
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
                                color: "var(--color-brand-orange)",
                                fontFamily: "var(--font-cormorant)",
                                fontWeight: 400,
                                fontSize: "22px",
                                lineHeight: "20px",
                                letterSpacing: "0.7px",
                            }}
                        >
                            Services
                        </div>
                        <div
                            style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                        >
                            High Tide Treatment
                        </div>
                        <div
                            style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                        >
                            Coastal Cabin Revival
                        </div>
                        <div
                            style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                        >
                            Shoreline Sweep
                        </div>
                    </div>
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
                                color: "var(--color-brand-orange)",
                                fontFamily: "var(--font-cormorant)",
                                fontWeight: 400,
                                fontSize: "22px",
                                lineHeight: "20px",
                                letterSpacing: "0.7px",
                            }}
                        >
                            Contact
                        </div>
                        <div
                            style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                        >
                            (403) 835-1526
                        </div>
                        <div
                            style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                        >
                            westcoastdiamonddetail@gmail.com
                        </div>
                        <div
                            style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "var(--color-faded-text)",
                                cursor: "pointer",
                                fontWeight: 300,
                            }}
                        >
                            Request a Quote
                        </div>
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
                    }}
                >
                    <div
                        style={{
                            fontWeight: 300,
                            fontSize: "14px",
                            lineHeight: "16px",
                            color: "var(--color-faded-text)",
                        }}
                    >
                        © 2026 Coastal Detailing. All rights reserved.
                    </div>
                    <div
                        style={{
                            fontWeight: 300,
                            fontSize: "14px",
                            lineHeight: "16px",
                            color: "var(--color-faded-text)",
                        }}
                    >
                        Terms & Privacy
                    </div>
                </div>
            </div>
        </div>
    )
}
