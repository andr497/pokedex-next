import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

export const POKEMON_API = "https://pokeapi.co/api/v2";

export const axiosInstance = axios.create({
    baseURL: POKEMON_API,
});

export const axiosCacheInstance = setupCache(axiosInstance);
