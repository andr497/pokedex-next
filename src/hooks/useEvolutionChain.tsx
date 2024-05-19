"use client";
import { useEffect, useMemo, useState } from "react";

import useSWR from "swr";

import { getPokemonById } from "@/api/pokemon";
import { colorPokemonTypes } from "@/helpers/pokemonHelpers";
import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import { fixEvolutionMethod, fixGenderText } from "@/helpers/evolutionChainPokemon";

interface Props {
    pokemon: IPokemonEvolutionChain;
}

const useEvolutionChain = ({ pokemon }: Props) => {
    const [color, setColor] = useState({ colorType1: "", colorType2: "" });
    const { data, isLoading } = useSWR(`${pokemon.id}`, getPokemonById);

    const evolutionDescription = useMemo(
        () => fixEvolutionMethod(pokemon),
        [pokemon]
    );

    const pokemonGender = useMemo(() => {
        return fixGenderText(pokemon.gender);
    }, [pokemon]);

    useEffect(() => {
        if (!isLoading) {
            const colors = colorPokemonTypes(data!.data);
            setColor(colors);
        }
    }, [data]);

    return {
        color,
        pokemonGender,
        evolutionDescription,
        isLoading
    };
};

export default useEvolutionChain;
