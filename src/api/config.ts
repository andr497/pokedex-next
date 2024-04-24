import axios from "axios";

export const POKEMON_API = "https://pokeapi.co/api/v2";

export const axiosInstance = axios.create({
    baseURL: POKEMON_API,
});