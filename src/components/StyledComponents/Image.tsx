"use client";
import CustomImage from "@/components/CustomImage";
import styled from "styled-components";

interface PokemonImageProps {
    colorType1?: string;
    colorType2?: string;
    $removeHover?: boolean;
}

// TODO: Refactor this component, refactor 'removeHover' props.
export const PokemonImage = styled(CustomImage)<PokemonImageProps>(
    ({ colorType1, colorType2, $removeHover = false }) => ({
        [`${
            !$removeHover
                ? ".card-pokemon-container:hover"
                : ".card-pokemon-container"
        } &`]: {
            filter: `
                drop-shadow(5px 5px 0px ${colorType2})
                drop-shadow(-5px -5px 0px ${colorType1})
            `,
        },
    })
);
