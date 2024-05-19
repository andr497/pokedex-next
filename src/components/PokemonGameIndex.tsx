"use client";
import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";

import { FlavorText } from "interfaces/PokeApi/CommonModels";
import { PokemonSpecies } from "interfaces/PokeApi/IPokemonSpecies";

import "react-multi-carousel/lib/styles.css";

interface Props {
    data: PokemonSpecies["flavor_text_entries"];
    types: { colorType1: string; colorType2: string };
}

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const PokemonGameIndex = ({ data, types }: Props) => {
    const [groupData, setGroupData] = useState<FlavorText[]>([]);

    useEffect(() => {
        const filterdData: FlavorText[] = data.filter(
            (item) => item.language.name === "en"
        );

        setGroupData(filterdData);
    }, [data]);

    console.log(types);

    return (
        <>
            {groupData.length === 0 ? null : (
                <>
                    <Carousel responsive={responsive}>
                        {groupData.map((flavor, key) => (
                            <div
                                key={`flavor-${key}`}
                                className="p-6 rounded dark:bg-gray-600 max-w-[200px]"
                            >
                                <h3 className="text-2xl font-bold mb-2 dark:text-gray-50 text-gray-900 capitalize">
                                    {`${flavor.version.name}`}
                                </h3>
                                <p className="dark:text-gray-100 text-gray-950">
                                    {`${flavor.flavor_text}`}
                                </p>
                            </div>
                        ))}
                    </Carousel>
                </>
            )}
        </>
    );
};

export default PokemonGameIndex;
