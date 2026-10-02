import Image from "next/image"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { packages, type ServicePackage } from "@/content/packages"

export function Packages() {
    return (
        <section
            id="packages"
            className="flex flex-col justify-center gap-10 px-5 py-25 md:gap-25"
        >
            <h2 className="text-center font-serif type-2xl font-normal">
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
            <p className="text-center type-lg text-muted">
                Prices vary based on size and condition. Add-ons available for
                complete customization.
            </p>
        </section>
    )
}

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
            className={`flex flex-wrap justify-center gap-x-20 gap-y-9 ${imageSide === "right" ? "flex-row" : "flex-row-reverse"}`}
        >
            <div className="flex w-full max-w-131 flex-col gap-4 md:gap-5">
                <div
                    aria-hidden
                    className="font-serif text-[128px] font-light text-numeral md:text-[224px]"
                >
                    {number}
                </div>
                <div className="flex flex-col gap-5 md:gap-7">
                    <Eyebrow>{pkg.subtitle}</Eyebrow>
                    <h3 className="font-serif type-2xl font-normal">
                        {pkg.title}
                    </h3>
                    <p className="font-serif type-xl font-light text-accent">
                        {pkg.priceRange}
                    </p>
                    <p className="type-lg font-light text-muted">
                        {pkg.description}
                    </p>
                    <a
                        href="#contact"
                        className="flex w-fit items-center gap-2 type-md font-light tracking-[0.7px] text-accent md:gap-4"
                    >
                        Book Now
                        <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                </div>
            </div>
            <div className="relative aspect-[0.75] w-full overflow-hidden rounded-lg md:w-140">
                <Image
                    src={pkg.imageSrc}
                    alt={pkg.title}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover"
                />
            </div>
        </article>
    )
}
