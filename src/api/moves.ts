import { AxiosResponse } from "axios";
import { axiosCacheInstance } from "./config";
import { PokemonMove } from "@/interfaces/PokeApi/IPokemonApi";
import { CombinePokemonMove, Moves } from "@/interfaces/PokeApi/IMoves";

export const getMovesById = async (id: string | number) => {
    const response: AxiosResponse<Moves> = await axiosCacheInstance({
        method: "get",
        url: `/move/${id}`,
    });

    return response.data;
};

export const getAllMovesPokemonMoves = async (moves: PokemonMove[]) => {
    const response: CombinePokemonMove[] = await Promise.all(
        moves.map(async (move) => {
            const responseMoves = await getMovesById(move.move.name);
            return {
                ...move,
                ...responseMoves
            };
        })
    );

    return response;
};

export const getAllPokemonMovesProcess = async (id: string | number) => {
    const response: AxiosResponse<{moves: CombinePokemonMove[]}> = await axiosCacheInstance({
        method: "get",
        baseURL: "http://localhost:3000/api",
        url: `/moves/${id}`,
    });

    return response.data;
};
