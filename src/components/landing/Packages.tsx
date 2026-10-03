import Image from "next/image"
import type { CSSProperties } from "react"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { packages, type ServicePackage } from "@/content/packages"
import { revealOrder } from "@/lib/reveal"

export function Packages() {
    return (
        <section
            id="packages"
            className="flex flex-col justify-center gap-10 px-5 py-25 md:gap-25"
        >
            <h2
                data-reveal
                className="reveal-up text-center font-serif type-2xl font-normal"
            >
                Shine Like the Coast
            </h2>
            <div className="flex flex-col items-center justify-center gap-20 px-5">
                {packages.map((p, i) => (
                    <PackageCard
                        key={p.id}
                        pkg={p}
                        number={String(i + 1).padStart(2, "0")}
                        imageSide={i % 2 === 0 ? "right" : "left"}
                    />
                ))}
            </div>
            <p data-reveal className="reveal-up text-center type-lg text-muted">
                Prices vary based on size and condition. Add-ons available for
                complete customization.
            </p>
        </section>
    )
}

const numeralParallax = {
    "--parallax-from": "-35%",
    "--parallax-to": "35%",
} as CSSProperties
const imageParallax = {
    "--parallax-from": "-6%",
    "--parallax-to": "6%",
} as CSSProperties

function PackageCard({
    pkg,
    number,
    imageSide,
}: {
    pkg: ServicePackage
    number: string
    imageSide: "left" | "right"
}) {
    return (
        <article
            id={pkg.id}
            data-reveal
            className={`package-timeline flex flex-wrap justify-center gap-x-20 gap-y-9 ${imageSide === "right" ? "flex-row" : "flex-row-reverse"}`}
        >
            <div className="flex w-full max-w-131 flex-col gap-4 md:gap-5">
                <div className="parallax-package" style={numeralParallax}>
                    <div
                        aria-hidden
                        className="reveal-up font-serif text-[128px] font-light text-numeral md:text-[224px]"
                    >
                        {number}
                    </div>
                </div>
                {/* relative: paint above the numeral as it drifts down behind */}
                <div className="relative flex flex-col gap-5 md:gap-7">
                    <div
                        className="reveal-up flex flex-wrap items-center gap-x-4 gap-y-2"
                        style={revealOrder(1)}
                    >
                        <Eyebrow>{pkg.subtitle}</Eyebrow>
                        {pkg.badge && (
                            <span className="rounded-full bg-accent px-3 py-1 type-sm font-medium tracking-[2px] text-on-accent uppercase">
                                {pkg.badge}
                            </span>
                        )}
                    </div>
                    <h3
                        className="reveal-up font-serif type-2xl font-normal"
                        style={revealOrder(2)}
                    >
                        {pkg.title}
                    </h3>
                    <p
                        className="reveal-up font-serif type-xl font-light text-accent"
                        style={revealOrder(3)}
                    >
                        {pkg.priceRange}
                    </p>
                    <p
                        className="reveal-up type-lg font-light text-muted"
                        style={revealOrder(4)}
                    >
                        {pkg.description}
                    </p>
                    <div className="reveal-up" style={revealOrder(5)}>
                        <a
                            href="#contact"
                            className="group/book relative flex w-fit items-center gap-2 py-1 type-md font-light tracking-[0.7px] text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-out-expo hover:after:scale-x-100 md:gap-4"
                        >
                            Book Now
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="transition-transform duration-500 ease-out-expo group-hover/book:translate-x-1.5"
                            />
                        </a>
                    </div>
                </div>
            </div>
            {/* Its own trigger: stacked on mobile, the photo enters view well after the text */}
            <div
                data-reveal
                className={`group/photo glint-on-hover relative aspect-[0.75] w-full overflow-hidden rounded-lg md:w-140 ${imageSide === "right" ? "reveal-wipe-from-right" : "reveal-wipe-from-left"}`}
            >
                <div
                    className="parallax-package absolute inset-x-0 -inset-y-[8%]"
                    style={imageParallax}
                >
                    <div className="reveal-settle absolute inset-0">
                        <Image
                            src={pkg.imageSrc}
                            alt={pkg.title}
                            fill
                            sizes="(min-width: 768px) 560px, 100vw"
                            className="object-cover transition-[scale] duration-1000 ease-out-expo group-hover/photo:scale-[1.04]"
                        />
                    </div>
                </div>
            </div>
        </article>
    )
}
