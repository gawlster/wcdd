export type ServicePackage = {
    /** Also used as the section's anchor id, e.g. `/#hightide` */
    id: string
    title: string
    subtitle: string
    priceRange: string
    description: string
    imageSrc: string
}

export const packages = [
    {
        id: "hightide",
        title: "High Tide Treatment",
        subtitle: "Premium Package",
        priceRange: "$299-$399",
        description:
            "The ultimate luxury detailing experience. Full-service package that transforms your car inside and out using premium products and meticulous techniques. Includes deep exterior cleaning, tire and trim detailing, interior vacuuming, carpet shampoo, and leather or fabric care with optional upgrades.",
        imageSrc: "/images/interior2.jpg",
    },
    {
        id: "coastal",
        title: "Coastal Cabin Revival",
        subtitle: "Interior Focus",
        priceRange: "$199-$249",
        description:
            "A deep interior detail tailored for vehicles needing more than standard cleaning. Perfect for tackling stains, odors, pet hair, or long-neglected cabins. Every surface from carpets and floor mats to dashboards and vents is carefully cleaned and refreshed.",
        imageSrc: "/images/interior1.jpg",
    },
    {
        id: "shoreline",
        title: "Shoreline Sweep",
        subtitle: "Maintenance Service",
        priceRange: "$119-$159",
        description:
            "Keep your vehicle looking fresh between full details. This upkeep-focused service refreshes both interior and exterior, maintaining the clean, polished look achieved from previous treatments. Perfect for routine care to extend protective coatings.",
        imageSrc: "/images/blue-car.jpeg",
    },
] satisfies ServicePackage[]
