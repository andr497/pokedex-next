"use client";
import { useMemo } from "react";

import useSWR from "swr";

import { getPokemonById } from "@/api/pokemon";
import { colorPokemonTypes } from "@/helpers/pokemonHelpers";
import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import {
    fixEvolutionMethod,
    fixGenderText,
} from "@/helpers/evolutionChainPokemon";

interface Props {
    pokemon: IPokemonEvolutionChain;
}

const useEvolutionChain = ({ pokemon }: Props) => {
    const { data, isLoading } = useSWR(`${pokemon.id}`, getPokemonById);

    const evolutionDescription = useMemo(
        () => fixEvolutionMethod(pokemon),
        [pokemon]
    );

    const pokemonGender = useMemo(() => {
        return fixGenderText(pokemon.gender);
    }, [pokemon]);

    const color = useMemo(() => {
        if (isLoading) return { colorType1: "", colorType2: "" };
        return colorPokemonTypes(data!.data);
    }, [data]);

    return {
        color,
        pokemonGender,
        evolutionDescription,
        isLoading,
    };
};

export default useEvolutionChain;
