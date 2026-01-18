export default function GenerationHeroSection() {
    return (
        <section className="flex flex-col md:flex-row gap-6 justify-between items-end border-b border-border pb-6 my-4">
            <div className="max-w-2xl space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">
                    EXPLORE THE POKÉDEX
                </h1>
                <p className="text-lg text-muted">
                    Access comprehensive data from the Pokémon universe. Select
                    a generation below to begin your research journey.
                </p>
            </div>
        </section>
    );
}
