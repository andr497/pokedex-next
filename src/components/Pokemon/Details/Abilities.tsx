"use client";

import { getAbilityById } from "@/api/pokemon";
import { fixAbilitiesName } from "@/helpers/pokemonHelpers";
import { Pokemon, PokemonAbility } from "@/interfaces/PokeApi/IPokemonApi";
import useSWR from "swr";

interface Props {
    abilities: Pokemon["abilities"];
}

export default function Abilities({ abilities }: Props) {
    return (
        <>
            <div className="space-y-4">
                {abilities.map((value, key) => (
                    <AbilityItem key={`ability-${key}`} data={value} />
                ))}
            </div>
        </>
    );
}

function AbilityItem({ data }: { data: PokemonAbility }) {
    const { data: value } = useSWR(data.ability.name, getAbilityById);
    if (!value) return null;

    const description = value.effect_entries.filter(
        (v) => v.language.name === "en"
    );

    return (
        <>
            <div
                className={`flex items-start gap-4 p-3 rounded-lg bg-foreground/5 border border-border`}
            >
                <div className="mt-1 size-8 shrink-0 rounded-full bg-foreground/20 text-muted flex items-center justify-center">
                    <span className="text-sm font-bold">{data.slot}</span>
                </div>
                <div className="">
                    <h4 className="text-base font-bold capitalize text-base-content">
                        {fixAbilitiesName(value.name)}{" "}
                        {data.is_hidden && (
                            <span className="text-xs bg-base-content/25 py-0.5 px-2 rounded-lg align-middle">
                                Hidden
                            </span>
                        )}
                    </h4>
                    <p className="text-muted text-sm mt-1">
                        {description[0].short_effect}
                    </p>
                </div>
            </div>
        </>
    );
}
