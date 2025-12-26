"use client";

import CounterApiResource from "@/components/ApiNamedResource/Counter";
import { Generation } from "@/interfaces/PokeApi/IGenerations";
import {
    Squares2X2Icon,
    BoltIcon,
    TagIcon,
    ShieldCheckIcon,
} from "@heroicons/react/20/solid";
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
        <>
            <section className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end border-b pb-6 mt-5 mb-10">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">
                            {generationName[0].name}
                        </h1>
                        <span className="px-3 py-1 rounded-full bg-surface-dark border border-[#354f6b] text-xs font-bold text-primary uppercase tracking-wider">
                            {generation.main_region.name}
                        </span>
                    </div>
                    <p className="text-lg text-muted">
                        {`You can see the list of ${generationName[0].name} pokemons below`}
                    </p>
                </div>
            </section>
            <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <CounterApiResource
                    label={"Total species"}
                    list={generation.pokemon_species}
                    icon={Squares2X2Icon}
                />
                <CounterApiResource
                    label={"Abilities"}
                    list={generation.abilities}
                    icon={BoltIcon}
                />
                <CounterApiResource
                    label={"New Types"}
                    list={generation.types}
                    icon={TagIcon}
                />
                <CounterApiResource
                    label={"New Moves"}
                    list={generation.moves}
                    icon={ShieldCheckIcon}
                />
            </section>
        </>
    );
};

export default Details;
