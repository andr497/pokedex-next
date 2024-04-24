"use client";
import { TypeDefenses } from "interfaces/PokeApi/IPokemonTypes";
import React from "react";
import Chip from "./Chip/Chip";
import IconSvg from "./IconSvg";
import { COLOR } from "helpers/constants";
import { checkBrightness } from "helpers/pokemonHelpers";
import useBrightness from "@/hooks/useBrightness";

interface Props {
    data: TypeDefenses;
}

type StringPokemonType = keyof typeof COLOR;

//TODO: Rename to WeaknessResistantList
const PokemonTypeTable = ({ data }: Props) => {
    return (
        <ul className="w-full">
            {Object.entries(data).map(
                ([key, values]: [string, StringPokemonType[]]) => {
                    if (values.length > 0) {
                        return (
                            <li
                                className="flex flex-col justify-content items-center border-b dark:border-gray-500"
                                key={`${key}`}
                            >
                                <div className="capitalize">
                                    {key.replace("_", " ")}
                                </div>
                                <div className="min-h-[50px]">
                                    {values.length === 0 ? (
                                        <span>None</span>
                                    ) : (
                                        <>
                                            {values.map(
                                                (type: StringPokemonType) => {
                                                    return (
                                                        <PokemonTypeChip
                                                            key={`card-type-${type}-${key}`}
                                                            type={type}
                                                        />
                                                    );
                                                }
                                            )}
                                        </>
                                    )}
                                </div>
                            </li>
                        );
                    } else {
                        return null;
                    }
                }
            )}
        </ul>
    );
};

const PokemonTypeChip = ({ type }: { type: StringPokemonType }) => {
    const fontColor: string = useBrightness(COLOR[type]);
    return (
        <Chip
            icon={
                <IconSvg
                    className="aspect-auto"
                    src={`/assets/types/${type}.svg`}
                    title={`icon-${type}`}
                    width={18}
                />
            }
            className="capitalize"
            label={""}
            size="small"
            style={{
                backgroundColor: COLOR[type],
                color: fontColor,
            }}
        />
    );
};

export default PokemonTypeTable;
