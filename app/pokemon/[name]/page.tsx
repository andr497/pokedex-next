import { Suspense } from "react";

import { Metadata } from "next";

import { notFound } from "next/navigation";
import { Loading } from "@/components/Loading";
import { PokemonStats } from "@/components/Pokemon/Stats";
import { colorPokemonTypes } from "helpers/pokemonHelpers";
import { findPokemonById } from "server/PokemonRepository";
import { findPokemonTypes } from "server/TypePokemonRepository";
import {
    PokemonDetailImage,
    PokemonNavigationName,
    PokemonCardInfo,
} from "@/components/Pokemon/Details";
import { EvolutionChain } from "@/components/Pokemon/EvolutionChain";
import { WeaknessResistantList } from "@/components/Pokemon/WeaknessResistant"


//import { WrapperTable } from "@/components/TableMove";

interface PropTypes {
    params: {
        name: string;
    };
}

export async function generateMetadata({
    params,
}: PropTypes): Promise<Metadata> {
    const { name } = params;
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
    const { name } = params;

    const data = await findPokemonById(name);
    if (!data) {
        return notFound();
    }
    const typesDetails = await findPokemonTypes(data.general.types);
    const { colorType1, colorType2 } = colorPokemonTypes(data.general);

    return (
        <Suspense fallback={<Loading />}>
            <section
                className={
                    "grid xl:grid-cols-12 md:grid-cols-12 sm:grid-cols-4"
                }
            >
                <section className="flex align-middle justify-around col-span-12 w-full my-5 max-sm:order-first">
                    <PokemonNavigationName data={data.general} />
                </section>
                <section className="w-full col-span-12 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6">
                    <PokemonCardInfo
                        data={data.general}
                        abilities={data.abilities}
                        varieties={data.varieties}
                    />
                </section>
                <section className="w-full xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 max-sm:order-first">
                    <PokemonDetailImage data={data.general} />
                </section>
                <section className="w-100 col-span-4 max-lg:col-span-12">
                    <PokemonStats
                        stats={data.stats}
                        types={{ colorType1, colorType2 }}
                    />
                </section>
                <section className="flex align-middle justify-around col-span-12 w-full mt-4">
                    <div className="w-full">
                        <h4 className="font-heading font-medium text-center text-4xl mb-8">
                            Evolution Chain
                        </h4>
                        <EvolutionChain
                            pokemonIdActual={data.general.id}
                            pokemonChain={data.evolution_chain}
                        />
                    </div>
                </section>

                <section className="w-full xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12">
                    <div className="w-full">
                        <h4
                            id="typing"
                            className="font-heading font-medium text-center text-4xl mb-8"
                        >
                            Typing
                        </h4>
                        <WeaknessResistantList data={typesDetails} />
                    </div>
                </section>
                {/* <section className="w-full col-span-12">
                    <WrapperTable pokemonId={data.general.id} />
                </section> */}

                {/* <section className="flex align-middle justify-around col-span-12 w-full mt-4 mb-4">
                    <div className="w-full">
                        <h4 className="font-heading font-medium text-center text-4xl mb-8">
                            Pokédex Entries
                        </h4>
                        <PokemonGameIndex
                            data={data.flavor_text_entries}
                            types={{ colorType1, colorType2 }}
                        />
                    </div>
                </section> */}
            </section>
        </Suspense>
    );
}
