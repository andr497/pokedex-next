import { clientAxios } from "./config";
import { CombinePokemonMove } from "@/interfaces/PokeApi/IMoves";

export const getAllPokemonMovesProcess = async ({
    id,
    params,
}: {
    id: string | number;
    params: any;
}): Promise<{ moves: CombinePokemonMove[] }> => {
    params = new URLSearchParams(params);
    const response = await clientAxios.get(
        `/moves/${id}?${params.toString()}`,
    );

    return response.data;
};
