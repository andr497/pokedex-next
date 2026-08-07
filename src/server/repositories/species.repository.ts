import { http } from "../config/http";

type IdName = number | string;

export const speciesRepository = {
    async getById(id: IdName) {
        const { data } = await http.get(`/pokemon-species/${id}`);
        return data;
    },
};
