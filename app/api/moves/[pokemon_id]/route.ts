import { getAllMovesPokemonMoves } from "@/api/moves";
import { getPokemonById } from "@/api/pokemon";
import ServerError from "@/helpers/ServerError";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { pokemon_id: string } }
) {
    try {
        const { pokemon_id } = params;

        const { data: pokemonResponse } = await getPokemonById(pokemon_id);
        const movesDetailsResponse = await getAllMovesPokemonMoves(
            pokemonResponse.moves
        );



        return Response.json(
            {
                moves: movesDetailsResponse,
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
