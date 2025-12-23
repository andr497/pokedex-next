export default function HeroSection() {
    return (
        <section className="flex flex-col md:flex-row gap-6 justify-between items-end mb-6 border-b border-border">
            <div className="flex flex-col gap-2 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-500">
                    EXPLORE THE POKÉDEX
                </h1>
                <p className="text-lg text-gray-600 dark:text-[#baa19c]">
                    Access comprehensive data from the Pokémon universe. Select
                    a generation below to begin your research journey.
                </p>
            </div>
            {/* Search */}
            
        </section>
    );
}
