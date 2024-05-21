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
            <section className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-2 gap-4">
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
