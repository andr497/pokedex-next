export default function TypeHeroSection() {
    return (
        <section className="flex flex-col md:flex-row gap-6 justify-between items-end border-b pb-6 my-4">
            <div className="max-w-2xl space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">
                    EXPLORE POKEMON TYPES
                </h1>
                <p className="text-lg text-muted">
                    Discover the elemental types that define Pokémon battles.
                    Learn their strengths, weaknesses, and characteristics to
                    better understand how different types interact in combat.
                </p>
            </div>
        </section>
    );
}
