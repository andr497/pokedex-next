import { axiosInstance } from "./config";
import {
    NamedAPIResourceWithId,
    NamedAPIResource,
} from "@/interfaces/PokeApi/CommonModels";
import { AxiosResponse } from "axios";

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
