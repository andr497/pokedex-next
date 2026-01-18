import { Suspense } from "react";

import { Metadata } from "next";

import { notFound } from "next/navigation";
import { PokemonStats } from "@/components/Pokemon/Stats";
import { colorPokemonTypes } from "@/helpers/pokemonHelpers";
import { findPokemonById } from "@/server/PokemonRepository";
import { findPokemonTypes } from "@/server/TypePokemonRepository";
import {
    PokemonCardInfo,
    PokemonProfile,
    PokemonAbilities,
} from "@/components/Pokemon/Details";
import Container from "@/components/layout/Container";
import {
    InformationCircleIcon,
    BoltIcon,
    ChartBarIcon,
    RectangleGroupIcon,
} from "@heroicons/react/20/solid";
import PokemonVarietiesFilters from "@/components/Pokemon/Filters";
import EvolutionChainContainer from "@/components/Pokemon/EvolutionChain/Container";

interface PropTypes {
    params: {
        name: string;
    };
}

export async function generateMetadata({
    params,
}: PropTypes): Promise<Metadata> {
    const { name } = await params;
    const data = await findPokemonById(name);
    if (!data) {
        return {
            title: `Pokedex - Not Found`,
        };
    }

    return {
        title: `Pokedex - ${data.general.name.toUpperCase()}`,
    };
}

export default async function PokemonPage({ params }: PropTypes) {
    const { name } = await params;

    const data = await findPokemonById(name);
    if (!data) {
        return notFound();
    }
    const typesDetails = await findPokemonTypes(data.general.types);
    const { colorType1, colorType2 } = colorPokemonTypes(data.general);

    return (
        <Suspense>
            <Container className="mt-4 space-y-4">
                <section className="w-full">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-muted text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            Forms &amp; Varieties
                        </h3>
                    </div>
                    <PokemonVarietiesFilters
                        pokemonId={data.general.id.toString()}
                        varieties={data.varieties}
                    />
                </section>
                <section className="relative w-full rounded-2xl overflow-hidden bg-surface border border-border">
                    <PokemonProfile data={data.general} />
                </section>
                <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="bg-surface border border-border rounded-xl p-6">
                            <h3 className="text-base-content text-lg font-bold mb-6 flex items-center gap-2">
                                <InformationCircleIcon className="w-6" />
                                Profile
                            </h3>
                            <PokemonCardInfo data={data.general} />
                        </div>

                        <div className="bg-surface border border-border rounded-xl p-6">
                            <h3 className="text-base-content text-lg font-bold mb-6 flex items-center gap-2">
                                <BoltIcon className="w-6" />
                                Abilities
                            </h3>
                            <PokemonAbilities abilities={data.abilities} />
                        </div>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-base-content text-lg font-bold flex items-center gap-2">
                                <ChartBarIcon className="w-6" />
                                Base Stats
                            </h3>
                        </div>
                        <PokemonStats
                            stats={data.stats}
                            types={{ colorType1, colorType2 }}
                        />
                    </div>
                </section>
                <section className="bg-surface border border-border rounded-xl p-6 lg:p-8">
                    <h3 className="text-base-content text-lg font-bold flex items-center gap-2">
                        <RectangleGroupIcon className="w-6" />
                        Evolution Chain
                    </h3>
                    <EvolutionChainContainer
                        pokemonIdActual={data.general.id}
                        pokemonChain={data.evolution_chain}
                        types={{ colorType1, colorType2 }}
                    />
                </section>
            </Container>
        </Suspense>
    );
}
