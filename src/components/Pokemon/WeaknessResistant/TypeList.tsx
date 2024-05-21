"use client";
import React from "react";

import { PokemonType } from "@/interfaces/PokeApi/IPokemonApi";
import { TypeDefenses } from "@/interfaces/PokeApi/IPokemonTypes";

import TypeElement from "./TypeElement";

interface Props {
    data: TypeDefenses;
}

const TypeList = ({ data }: Props) => {
    return (
        <ul className="w-full">
            {Object.entries(data).map(
                ([key, values]: [string, PokemonType["type"]["name"][]]) => (
                    <TypeElement
                        key={`typing-weakness-${key}`}
                        types={values}
                        label={key}
                    />
                )
            )}
        </ul>
    );
};

export default TypeList;
