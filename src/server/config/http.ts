import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { env } from "./env";

const axiosBase = Axios.create({
    baseURL: env.POKEMON_API,
    timeout: 5000,
});

export const http = setupCache(axiosBase, { ttl: 1000 * 60 * 60 });
