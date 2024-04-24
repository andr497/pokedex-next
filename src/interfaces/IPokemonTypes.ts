import { COLOR } from './../helpers/constants';

type pokemonTypeKey = keyof typeof COLOR;

export interface pokemonTypes {
    name: pokemonTypeKey;
    url: string;
}
