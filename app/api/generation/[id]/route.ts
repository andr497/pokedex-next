import { getGenerationById } from "@/api/generation";
import { getPokemonById, getPokemonSpeciesById } from "@/api/pokemon";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

type Params = {
    params: {
        id: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    try {
        let { id } = params;

        const {
            data: { pokemon_species },
        } = await getGenerationById(id);

        const pokemonSpecies = await Promise.all(
            pokemon_species.map(async (pokemon) => {
                const splittedUrl = pokemon.url
                    .split("/")
                    .filter((value) => value !== "");
                const id = splittedUrl[splittedUrl.length - 1] as string;
                const responsePokemonSpecies = await getPokemonSpeciesById(id);
                const responsePokemon = await getPokemonById(id);
                return {
                    ...responsePokemon.data,
                    ...responsePokemonSpecies.data,
                };
            })
        );

        return Response.json(
            {
                pokemon_species: pokemonSpecies,
            },
            {
                status: 200,
            }
        );
    } catch (e) {
        if (e instanceof AxiosError) {
            return Response.json(
                {
                    message: e.message,
                },
                {
                    status: e.response?.status ?? 500,
                }
            );
        }
        if (e instanceof Error) {
            return Response.json(
                {
                    message: e.message,
                },
                {
                    status: 500,
                }
            );
        }
    }
}
