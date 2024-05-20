"use client";

import CounterApiResource from "@/components/ApiNamedResource/Counter";
import { Generation } from "@/interfaces/PokeApi/IGenerations";
import { useMemo } from "react";

interface Props {
    generation: Generation;
}

const Details = ({ generation }: Props) => {
    const generationName = useMemo(
        () => generation.names.filter((name) => name.language.name === "en"),
        [generation]
    );

    return (
        <div>
            <section className="flex flex-wrap text-center justify-between gap-4">
                <div className="w-full">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold dark:text-gray-200 text-gray-800 sm:text-4xl">
                            {generationName[0].name}
                        </h2>
                        <p className="mt-3 text-xl dark:text-gray-500 text-gray-600 sm:mt-4">
                            {`You can see the list of ${generationName[0].name} pokemons below`}
                        </p>
                    </div>
                </div>
                <CounterApiResource
                    label={"Pokémon"}
                    list={generation.pokemon_species}
                />
                <CounterApiResource
                    label={"Abilities"}
                    list={generation.abilities}
                />
                <CounterApiResource label={"Types"} list={generation.types} />
                <CounterApiResource label={"Moves"} list={generation.moves} />
            </section>
        </div>
    );
};

export default Details;
