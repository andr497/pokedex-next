"use client";
import React from "react";

import { CustomPokemon } from "@/interfaces/CustomPokeApi/CustomPokemon";

import PokemonCard from "./Card";
import { ButtonToTop } from "../Common";

interface Props {
    pokemons: CustomPokemon[];
}

const Container = ({ pokemons }: Props) => {
    return (
        <>
            <ButtonToTop />
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pokemons.map((pokemon, key) => (
                    <PokemonCard
                        pokemon={pokemon}
                        key={`pokemon-card-${key}`}
                    />
                ))}
            </section>
        </>
    );
};

export default Container;
