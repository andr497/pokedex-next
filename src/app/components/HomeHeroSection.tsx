import SvgPokeball from "@/components/SvgPokeball";
import {
    ChartBarIcon,
    HeartIcon,
    MapIcon,
    RectangleGroupIcon,
} from "@heroicons/react/20/solid";

export default function HomeHeroSection() {
    return (
        <>
            <section className="relative flex flex-col md:flex-row gap-6 justify-between items-end border-b border-border pb-6 my-4">
                <div className="max-w-2xl space-y-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-6">
                        The Ultimate Pokémon Encyclopedia
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">
                        Explore Every Generation.
                    </h1>
                    <p className="text-lg text-muted">
                        Step into the Pokémon universe and start exploring! Look
                        up any Pokémon to discover its stats, evolution path,
                        and moves, and learn what makes each one unique.
                    </p>
                </div>

                <SvgPokeball
                    src="/assets/patterns/pokeball.svg"
                    style={{
                        "& > div > svg": {
                            width: "220px",
                            height: "220px",
                        },
                    }}
                    className="absolute top-1/2 right-0 -translate-y-1/2 hidden md:block dark:opacity-50 pointer-events-none"
                    title={"Pokeball-svg-image"}
                />
            </section>

            <section className="py-16 bg-surface">
                <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                                <ChartBarIcon className="m-1" />
                            </div>
                            <h3 className="text-xl font-bold">
                                Detailed Stats
                            </h3>
                            <p className="text-muted text-sm">
                                Analyze base stats, type effectiveness, and
                                competitive viability for every Pokémon ever
                                discovered.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-900 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                <RectangleGroupIcon className="m-1" />
                            </div>
                            <h3 className="text-xl font-bold">
                                Evolution Trees
                            </h3>
                            <p className="text-muted text-sm">
                                Trace the complex growth of your favorite
                                Pokémon, including special evolution conditions
                                and mega forms.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                <MapIcon className="m-1" />
                            </div>
                            <h3 className="text-xl font-bold">Regional Data</h3>
                            <p className="text-muted text-sm">
                                Explore the unique ecosystems of the Pokémon
                                world, from Kanto&apos;s lush forests to
                                Paldea&apos;s vast craters.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
                        <div className="p-4 rounded-2xl bg-primary/5 text-primary">
                            <HeartIcon className="text-xl w-8" />
                        </div>
                        <h2 className="text-3xl font-bold">
                            A Tribute to the Community
                        </h2>
                        <p className="text-muted">
                            This project is a labor of love for the Pokémon
                            community. We want to express our deepest gratitude
                            to the creators of{" "}
                            <a
                                className="text-primary font-bold hover:underline"
                                href="https://pokeapi.co/"
                                target="_blank"
                            >
                                PokeAPI
                            </a>
                            . Their tireless work in maintaining a
                            comprehensive, free-to-use API is what makes this
                            explorer possible.
                        </p>
                        <div className="flex gap-4">
                            <a
                                className="text-sm font-bold text-primary hover:text-red-700 transition-colors border-b border-primary/20 pb-1"
                                href="https://pokeapi.co/"
                                target="_blank"
                            >
                                Support PokeAPI
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
