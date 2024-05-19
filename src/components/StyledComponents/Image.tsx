"use client";
import CustomImage from "@/components/CustomImage";
import styled from "styled-components";

export const PokemonImage = styled(CustomImage)((props) => {
    const { colorType1, colorType2 } = props;
    return {
        ".card-pokemon-container:hover &": {
            filter: `drop-shadow(5px 5px 0px ${colorType2})
            drop-shadow(-5px -5px 0px ${colorType1})`,
        },
    };
});
