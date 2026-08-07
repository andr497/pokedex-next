"use client";
import { PokemonType } from "@/interfaces/PokeApi/IPokemonApi";
import TypeChip from "./TypeChip";
import { useMemo } from "react";
import { TypeMultiplier } from "@/server/TypePokemonRepository";

interface Props {
    types: TypeMultiplier[];
    label: string;
}

const TypeElement = ({ types, label }: Props) => {
    const fixLabel = useMemo(() => label.replaceAll("_", " "), [label]);

    return (
        <>
            {types.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-muted text-xs font-bold uppercase tracking-wider">
                        {fixLabel}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {types.map(({ type, multiplier }, key) => (
                            <TypeChip
                                key={`card-type-${type}-${key}`}
                                multiplier={multiplier}
                                type={type}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default TypeElement;
