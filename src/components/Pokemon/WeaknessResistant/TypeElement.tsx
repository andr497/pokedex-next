"use client";
import { PokemonType } from "@/interfaces/PokeApi/IPokemonApi";
import React, { useMemo } from "react";
import TypeChip from "./TypeChip";
import Divider from "@/components/ui/Divider";

interface Props {
    types: PokemonType["type"]["name"][];
    label: string;
}

const TypeElement = ({ types, label }: Props) => {
    const fixLabel = useMemo(() => label.replaceAll("_", " "), [label]);

    return (
        <>
            {types.length > 0 && (
                <li className="flex flex-col justify-center items-center">
                    <div className="w-full capitalize">
                        <Divider label={fixLabel} />
                    </div>
                    <div className="min-h-12.5">
                        {types.map((type, key) => (
                            <TypeChip
                                key={`card-type-${type}-${key}`}
                                type={type}
                            />
                        ))}
                    </div>
                </li>
            )}
        </>
    );
};

export default TypeElement;
