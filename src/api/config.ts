import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

export const POKEMON_API = "https://pokeapi.co/api/v2";

export const axiosInstance = axios.create({
    baseURL: POKEMON_API,
});

export const axiosCacheInstance = setupCache(axiosInstance);

// TODO: Cambiar esto de manera dinamica del dominio y usar .env

export const clientAxios = axios.create({
    baseURL: "http://localhost:3000/api",
});

type FetchOptions = RequestInit & {
    next?: NextFetchRequestConfig;
};

const BASE = "http://localhost:3000/api";

export async function clientHttp<T>(
    url: string,
    options: FetchOptions,
): Promise<T> {
    const res = await fetch(`${BASE}/${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
    }

    return res.json();
}
