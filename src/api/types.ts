import { TypeDetail } from "@/interfaces/PokeApi/IPokemonTypes";
import { axiosInstance, clientAxios } from "./config";
import {
    NamedAPIResourceWithId,
    NamedAPIResource,
} from "@/interfaces/PokeApi/CommonModels";
import { AxiosResponse } from "axios";
import { IPokemonTypeDetails } from "@/interfaces/IPokemonTypes";

export const getTypes = async (): Promise<TypeDetail[]> => {
    const response: AxiosResponse<TypeDetail[]> =
        await clientAxios.get(`/types`);
    return response.data;
};

export const getTypeDetail = async (
    id: string | number,
): Promise<IPokemonTypeDetails> => {
    const response: AxiosResponse<IPokemonTypeDetails> = await clientAxios.get(
        `/types/${id}`,
    );

    return response.data;
};

interface PropsParams {
    limit?: number;
    offset?: number;
}

export const getAllPokemonTypes = async ({
    limit,
}: PropsParams): Promise<NamedAPIResourceWithId[]> => {
    const response = await axiosInstance({
        method: "get",
        url: `/type`,
        params: {
            limit,
        },
    });

    let results: NamedAPIResourceWithId[] = response.data.results.map(
        (value: NamedAPIResource) => {
            return {
                id: value.url.split("/")[6],
                name: value.name,
            };
        },
    );

    return results;
};
