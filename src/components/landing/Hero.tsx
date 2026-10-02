import Image from "next/image"
import { faAngleDown, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ButtonLink } from "@/components/ui/Button"
import { site } from "@/content/site"

export function Hero() {
    return (
        <section id="home" className="relative h-svh w-full">
            <Image
                src="/images/white-car.jpeg"
                alt=""
                fill
                preload
                sizes="100vw"
                className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 z-1 bg-bg/20" />
            <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-transparent to-bg" />
            <Navbar />
            <div className="pointer-events-none absolute inset-0 z-2 mx-5 flex max-w-228.75 items-center md:mx-25">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <span
                            aria-hidden
                            className="h-px w-full max-w-6 min-w-0 shrink bg-accent md:h-0.5 md:max-w-16"
                        />
                        <p className="type-xl grow font-light tracking-[4.2px] text-accent">
                            MOBILE AUTO DETAILING
                        </p>
                    </div>
                    <h1 className="type-3xl font-serif font-medium">
                        Showroom Quality, Delivered to Your Door
                    </h1>
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-2 flex justify-center pb-8">
                <a
                    href="#packages"
                    aria-label="Scroll to services"
                    className="text-lg text-accent"
                >
                    <FontAwesomeIcon icon={faAngleDown} />
                </a>
            </div>
        </section>
    )
}

function Navbar() {
    return (
        <nav className="relative z-2 flex items-center justify-between px-5 py-5 md:px-25">
            <a href="#home" className="relative size-15">
                <Image
                    src="/images/logo-white.png"
                    alt={site.name}
                    fill
                    sizes="60px"
                    className="object-cover"
                />
            </a>
            <div className="hidden items-center justify-center gap-8 md:flex">
                <a href="#home">Home</a>
                <a href="#packages">Services</a>
                <a href="#contact">Contact</a>
            </div>
            <ButtonLink href="#contact">
                CONTACT US
                <FontAwesomeIcon icon={faArrowRight} />
            </ButtonLink>
        </nav>
    )
}
