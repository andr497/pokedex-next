import { axiosCacheInstance } from "@/api/config";
import { CustomPokemon } from "@/interfaces/CustomPokeApi/CustomPokemon";
import {
    NamedAPIResource,
    PaginationData,
} from "@/interfaces/PokeApi/CommonModels";
import { Pokemon } from "@/interfaces/PokeApi/IPokemonApi";
import { PokemonSpecies } from "@/interfaces/PokeApi/IPokemonSpecies";
import { getPokemonList } from "api/pokemon";
import { AxiosResponse } from "axios";
import { NextRequest } from "next/server";

// export async function GET(request: Request) {
//     try {
//         const data = await getPokemonList("pokemon-species");
//         return Response.json({ ...data });
//     } catch (e) {
//         const error = e as Error;

//         return Response.json(
//             { error: true, status_code: 500, message: error.message },
//             {
//                 status: 500,
//             }
//         );
//     }
// }

export async function GET(request: NextRequest) {
    try {
        const limit = request.nextUrl.searchParams.get("limit") ?? -1;
        const name = request.nextUrl.searchParams.get("name") ?? "";

        const pokemonSpecies: AxiosResponse<
            PaginationData<NamedAPIResource[]>
        > = await axiosCacheInstance.get(`pokemon-species`, {
            params: {
                limit,
            },
            
        });

        const filteredPokemonSpecies: NamedAPIResource[] =
            pokemonSpecies.data.results.filter((value) =>
                value.name.includes(name)
            );

        const allPokemonDetails: CustomPokemon[] = await Promise.all(
            filteredPokemonSpecies.map(async (pokemon) => {
                const splittedUrl = pokemon.url
                    .split("/")
                    .filter((value) => value !== "");
                const id = splittedUrl[splittedUrl.length - 1] as string;

                const pokemonSpeciesResponse: AxiosResponse<PokemonSpecies> =
                    await axiosCacheInstance.get(`/pokemon-species/${id}`);
                const pokemonResponse: AxiosResponse<Pokemon> =
                    await axiosCacheInstance.get(`/pokemon/${id}`);

                const { name, ...restPokemonSpecies } = pokemonSpeciesResponse.data
                const { types, ...others } = pokemonResponse.data
                return {
                    id: restPokemonSpecies.id,
                    name,
                    types
                };
            })
        );

        return Response.json(
            {
                pokemon: allPokemonDetails,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        if (error instanceof ServerError) {
            return Response.json(
                {
                    error: true,
                    message: error.message,
                },
                {
                    status: error.statusCode,
                }
            );
        }

        if (error instanceof Error) {
            return Response.json(
                {
                    error: true,
                    message: error.message,
                },
                {
                    status: 500,
                }
            );
        }
    }
}