"use client";
import React, { useMemo, useState } from "react";

import { motion } from "framer-motion";

import Chip from "@/components/Common/Chip";
import CustomImage from "@/components/CustomImage";
import { GeneralInfoPokemon } from "@/interfaces/IPokemonDetails";
import { checkBrightness, colorPokemonTypes } from "@/helpers/pokemonHelpers";

import Toggle from "./Toggle/Toggle";

import "@/styles/flip.css";

interface Props {
    data: GeneralInfoPokemon;
}

const PokemonDetailImage = ({ data }: Props) => {
    const [activeShiny, setActiveShiny] = useState<boolean>(false);

    const toggleImage = () => {
        setActiveShiny((prev) => !prev);
    };

    const { colorType1 } = useMemo(() => {
        return colorPokemonTypes(data);
    }, [data]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center flex-col relative"
        >
            <div
                id="image-pokemon-container"
                className="relative w-full h-full flex justify-center"
            >
                <CustomImage
                    loading="lazy"
                    alt={data.name}
                    src={data.image ?? ""}
                    width={300}
                    height={300}
                    className={`${
                        activeShiny ? "opacity-0" : "opacity-100"
                    } absolute top-0 left-50 max-sm:w-[250px] transition-opacity duration-500`}
                    onClick={data.image_shiny ? toggleImage : () => {}}
                />
                <CustomImage
                    loading="lazy"
                    alt={data.name}
                    src={data.image_shiny ?? ""}
                    width={300}
                    height={300}
                    className={`${
                        activeShiny ? "opacity-100" : "opacity-0"
                    } max-sm:w-[250px] transition-opacity duration-500`}
                    onClick={data.image_shiny ? toggleImage : () => {}}
                />
            </div>

            {data.image_shiny ? (
                <Toggle
                    active={activeShiny}
                    setActive={setActiveShiny}
                    color={colorType1}
                />
            ) : (
                <small className="dark:text-gray-200 text-gray-500">
                    Shiny image not available
                </small>
            )}

            <Chip
                className="capitalize"
                label={data.genera}
                size="small"
                style={{
                    background: colorType1,
                    color: checkBrightness(colorType1) ? "#fff" : "#000",
                }}
            />
        </motion.div>
    );
};

export default PokemonDetailImage;
