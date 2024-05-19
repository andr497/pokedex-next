import { MOVES_METHODS_ARRAY, VERSION_GROUP_ARRAY } from "@/helpers/constants";

export type ValueLabel<T = string> = {
    value: T;
    label: string;
};

export type MoveLearnMethod = (typeof MOVES_METHODS_ARRAY)[number];
export type VersionGroup = (typeof VERSION_GROUP_ARRAY)[number];
