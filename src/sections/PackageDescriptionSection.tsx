import Image from "next/image"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function PackageDescriptionSection() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "100px",
                paddingBlock: "100px",
            }}
        >
            <div
                style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: "400",
                    fontStyle: "semibold",
                    fontSize: "80px",
                    textAlign: "center",
                    lineHeight: "105px",
                }}
            >
                Shine Like the Coast
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "80px",
                    paddingInline: "20px",
                }}
            >
                {packages.map((p, i) => (
                    <PackageDescription
                        key={p.id}
                        p={p}
                        imageLocation={i % 2 === 0 ? "right" : "left"}
                        packageNumber={`0${i + 1}`}
                    />
                ))}
            </div>
            <div
                style={{
                    fontSize: "18px",
                    lineHeight: "20px",
                    textAlign: "center",
                    color: "var(--color-faded-text)",
                }}
            >
                Prices vary based on vehicle size. Add-ons available for
                complete customization.
            </div>
        </div>
    )
}

type PackageDescription = {
    id: string
    title: string
    subtitle: string
    priceRange: string
    description: string
    imageLocation: string
}

const packages = [
    {
        id: "hightide",
        title: "High Tide Treatment",
        subtitle: "Premium Package",
        priceRange: "$299-$399",
        description:
            "The ultimate luxury detailing experience. Full-service package that transforms your car inside and out using premium products and meticulous techniques. Includes deep exterior cleaning, tire and trim detailing, interior vacuuming, carpet shampoo, and leather or fabric care with optional upgrades.",
        imageLocation: "/images/interior2.jpg",
    },
    {
        id: "coastal",
        title: "Coastal Cabin Revival",
        subtitle: "Interior Focus",
        priceRange: "$199-$249",
        description:
            "A deep interior detail tailored for vehicles needing more than standard cleaning. Perfect for tackling stains, odors, pet hair, or long- neglected cabins. Every surface from carpets and floor mats to dashboards and vents is carefully cleaned and refreshed.",
        imageLocation: "/images/interior1.jpg",
    },
    {
        id: "shoreline",
        title: "Shoreline Sweep",
        subtitle: "Maintenance Service",
        priceRange: "$119-$159",
        description:
            "Keep your vehicle looking fresh between full details. This upkeep-focused service refreshes both interior and exterior, maintaining the clean, polished look achieved from previous treatments. Perfect for routine care to extend protective coatings.",
        imageLocation: "/images/blue-car.jpeg",
    },
] as PackageDescription[]

function PackageDescription({
    p,
    imageLocation,
    packageNumber,
}: {
    p: PackageDescription
    imageLocation: "left" | "right"
    packageNumber: string
}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection:
                    imageLocation === "right" ? "row" : "row-reverse",
                justifyContent: "center",
                gap: "80px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    maxWidth: "524px",
                }}
            >
                <div
                    style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "224px",
                        fontWeight: "300",
                        color: "#262E36",
                    }}
                >
                    {packageNumber}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "28px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <div
                            style={{
                                width: "48px",
                                height: "1px",
                                background: "var(--color-brand-orange)",
                            }}
                        />
                        <div
                            style={{
                                color: "var(--color-brand-orange)",
                                fontWeight: "400",
                                fontSize: "12px",
                                letterSpacing: "3px",
                            }}
                        >
                            {p.subtitle.toUpperCase()}
                        </div>
                    </div>
                    <div
                        style={{
                            fontFamily: "var(--font-cormorant)",
                            fontWeight: "400",
                            fontStyle: "medium",
                            fontSize: "60px",
                            lineHeight: "60px",
                        }}
                    >
                        {p.title}
                    </div>
                    <div
                        style={{
                            fontFamily: "var(--font-cormorant)",
                            fontWeight: "300",
                            fontStyle: "regular",
                            fontSize: "24px",
                            lineHeight: "32px",
                            color: "var(--color-brand-orange)",
                        }}
                    >
                        {p.priceRange}
                    </div>
                    <div
                        style={{
                            width: "100%",
                            fontWeight: "300",
                            fontStyle: "regular",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: "var(--color-faded-text)",
                        }}
                    >
                        {p.description}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            cursor: "pointer",
                            width: "fit-content",
                        }}
                    >
                        <div
                            style={{
                                fontWeight: "300",
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0.7px",
                                color: "var(--color-brand-orange)",
                            }}
                        >
                            Book Now
                        </div>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            fontWeight={300}
                            color="var(--color-brand-orange)"
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    overflow: "hidden",
                    borderRadius: "8px",
                    width: "560px",
                    height: "746px",
                    position: "relative",
                }}
            >
                <Image
                    src={p.imageLocation}
                    alt={p.title}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
        </div>
    )
}
