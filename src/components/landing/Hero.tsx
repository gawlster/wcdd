import Image from "next/image"
import type { CSSProperties } from "react"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { HeroSpotlight } from "@/components/motion/HeroSpotlight"

// Split by phrase so each line can rise in and catch the glint in turn
const headline = ["Showroom Quality,", "Delivered to Your Door"]

export function Hero() {
    return (
        <section
            id="home"
            className="hero-timeline relative isolate h-svh w-full overflow-clip"
        >
            <div className="parallax-hero-image absolute inset-0">
                <Image
                    src="/images/white-car.jpeg"
                    alt=""
                    fill
                    preload
                    sizes="100vw"
                    className="hero-image object-cover"
                />
            </div>
            <HeroSpotlight />
            <div className="pointer-events-none absolute inset-0 z-1 bg-bg/20" />
            <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-transparent to-bg" />
            <div className="hero-lift-away pointer-events-none absolute inset-0 z-2 mx-5 flex max-w-228.75 items-center md:mx-25">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <span
                            aria-hidden
                            className="hero-rule h-px w-full max-w-6 min-w-0 shrink bg-accent md:h-0.5 md:max-w-16"
                        />
                        <p className="hero-eyebrow grow type-xl font-light tracking-[4.2px] text-accent">
                            MOBILE AUTO DETAILING
                        </p>
                    </div>
                    <h1 className="font-serif type-3xl font-medium">
                        {headline.map((line, i) => (
                            <span
                                key={line}
                                className="hero-line shine-text block"
                                style={{ "--line": i } as CSSProperties}
                            >
                                {line}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>
            <div className="hero-lift-away absolute inset-x-0 bottom-0 z-2 flex justify-center pb-8">
                <a
                    href="#packages"
                    aria-label="Scroll to services"
                    className="hero-cue p-2 text-lg text-accent"
                >
                    <FontAwesomeIcon icon={faAngleDown} />
                </a>
            </div>
        </section>
    )
}
