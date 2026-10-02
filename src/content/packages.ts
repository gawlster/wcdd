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
        priceRange: "Starting at $299",
        description:
            "The ultimate luxury detailing experience. Full-service package that transforms your car inside and out using premium products and meticulous techniques. Includes deep exterior cleaning, tire and trim detailing, interior vacuuming, carpet shampoo, and leather or fabric care with optional upgrades.",
        imageSrc: "/images/interior2.jpg",
    },
    {
        id: "coastal",
        title: "Coastal Cabin Revival",
        subtitle: "Interior Focus",
        priceRange: "Starting at $199",
        description:
            "A deep interior detail tailored for vehicles needing more than standard cleaning. Perfect for tackling stains, odors, pet hair, or long-neglected cabins. Every surface from carpets and floor mats to dashboards and vents is carefully cleaned and refreshed.",
        imageSrc: "/images/interior1.jpg",
    },
    {
        id: "shoreline",
        title: "Shoreline Sweep",
        subtitle: "Maintenance Service",
        priceRange: "Starting at $119",
        description:
            "Keep your vehicle looking fresh between full details. This upkeep-focused service refreshes both interior and exterior, maintaining the clean, polished look achieved from previous treatments. Perfect for routine care to extend protective coatings.",
        imageSrc: "/images/blue-car.jpeg",
    },
    {
        id: "ceramic",
        title: "Ceramic Coating",
        subtitle: "Paint Protection",
        priceRange: "Starting at $999",
        description:
            "The ultimate ceramic protection experience. A premium package designed to enhance your vehicle’s gloss while providing long-lasting protection against UV rays, road grime, environmental contaminants, and everyday wear. Includes meticulous paint preparation and application of our premium ceramic coating for a deep, high-gloss finish, easier maintenance, and lasting protection that keeps your vehicle looking freshly detailed for longer.",
        imageSrc: "/images/ceramic.jpg",
    },
    {
        id: "rv",
        title: "RV",
        subtitle: "Exterior Detailing",
        priceRange: "Contact for a quote",
        description:
            "Keep your RV looking road-ready wherever the journey takes you. Our professional RV exterior detailing service is designed to remove built-up road grime, oxidation, dirt, and environmental contaminants while restoring a clean, polished appearance. From the roof and body to the wheels, windows, and exterior trim, every surface is carefully cleaned and finished using premium products and proven techniques—leaving your RV looking fresh, protected, and ready for its next adventure.",
        imageSrc: "/images/rv.jpg",
    },
    {
        id: "marine",
        title: "Marine",
        subtitle: "Boat Care",
        priceRange: "Contact for a quote",
        description:
            "The ultimate marine detailing experience. A complete boat care package designed to restore, protect, and enhance your vessel from bow to stern. Includes a thorough exterior detail covering the hull, topsides, rails, fixtures, and other exterior surfaces, along with select interior cleaning and detailing. Finished with premium products and meticulous techniques to bring back a clean, polished look and keep your boat looking its best on the water.",
        imageSrc: "/images/marine.jpg",
    },
] satisfies ServicePackage[]
