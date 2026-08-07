import { COLOR, GENERATION_HOVER_COLORS } from "@/helpers/constants";

export type GenerationNames = keyof typeof GENERATION_HOVER_COLORS;

export type IdName = string | number;

export type ColorType = keyof typeof COLOR;
