export type ServicePackage = {
    /** Also used as the section's anchor id, e.g. `/#high-tide-treatment` */
    id: string
    title: string
    subtitle: string
    /** Optional highlight shown beside the subtitle, e.g. "Most Popular" */
    badge?: string
    priceRange: string
    description: string
    imageSrc: string
}

export const packages = [
    {
        id: "high-tide-treatment",
        title: "High Tide Treatment",
        subtitle: "Premium Package",
        badge: "Most Popular",
        priceRange: "Starting at $299",
        description:
            "A top-to-bottom luxury detail that transforms your car inside and out. Outside, every panel gets a deep clean and the tires and trim are detailed. Inside, we vacuum throughout, shampoo the carpets, and care for your leather or fabric upholstery. Optional upgrades are available.",
        imageSrc: "/images/interior2.jpg",
    },
    {
        id: "coastal-cabin-revival",
        title: "Coastal Cabin Revival",
        subtitle: "Interior Focus",
        priceRange: "Starting at $199",
        description:
            "A restorative interior detail for cabins that need more than a quick clean. We tackle stains, odors, pet hair, and long-term neglect, working through every surface from the carpets and floor mats to the dashboard and vents.",
        imageSrc: "/images/interior1.jpg",
    },
    {
        id: "shoreline-sweep",
        title: "Shoreline Sweep",
        subtitle: "Maintenance Service",
        priceRange: "Starting at $119",
        description:
            "Keep your vehicle looking its best between full details. This maintenance service refreshes the interior and exterior to preserve the results of your last treatment, and regular visits help your protective coatings last longer.",
        imageSrc: "/images/blue-car.jpeg",
    },
    {
        id: "sea-glass-ceramic",
        title: "Sea Glass Ceramic",
        subtitle: "Paint Protection",
        priceRange: "Starting at $999",
        description:
            "Long-term protection with a deep, glossy finish. We carefully prepare the paint, then apply our premium ceramic coating to guard against UV rays, road grime, environmental contaminants, and everyday wear. The result is paint that is easier to wash, holds its shine, and stays looking freshly detailed for longer.",
        imageSrc: "/images/ceramic.jpg",
    },
    {
        id: "open-road-refresh",
        title: "Open Road Refresh",
        subtitle: "Exterior Detailing",
        priceRange: "Contact for a quote",
        description:
            "Road-ready care for your home on wheels. This RV exterior detail strips away built-up dirt, oxidation, and contaminants from the roof and body, then cleans and finishes the wheels, windows, and trim. Your rig comes back looking sharp and protected for the next adventure.",
        imageSrc: "/images/rv.jpg",
    },
    {
        id: "seaworthy-shine",
        title: "Seaworthy Shine",
        subtitle: "Boat Care",
        priceRange: "Contact for a quote",
        description:
            "Bow-to-stern detailing for your vessel. The exterior work covers the hull, topsides, rails, fixtures, and every other outside surface, and select interior areas are cleaned and detailed as well. Your boat is restored, protected, and ready to turn heads on the water.",
        imageSrc: "/images/marine.jpg",
    },
] satisfies ServicePackage[]
