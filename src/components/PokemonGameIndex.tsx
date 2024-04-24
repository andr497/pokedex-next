"use client";
import React, { useEffect, useState } from "react";

import { PokemonSpecies } from "interfaces/PokeApi/IPokemonSpecies";
import Tabs from "./TabPanel/Tabs";
import Tab from "./TabPanel/Tab";
import { motion } from "framer-motion";
import { FlavorText } from "interfaces/PokeApi/CommonModels";

interface Props {
    data: PokemonSpecies["flavor_text_entries"];
    types: { colorType1: string; colorType2: string };
}

const PokemonGameIndex = ({ data, types }: Props) => {
    const [groupData, setGroupData] = useState<FlavorText[]>([]);

    useEffect(() => {
        const filterdData: FlavorText[] = data.filter(
            (item) => item.language.name === "en"
        );

        setGroupData(filterdData);
    }, [data]);

    return (
        <>
            {groupData.length === 0 ? (
                <div className="w-full flex justify-center px-2 py-5 mx-2">
                    <span className="text-center" style={{ backgroundColor: types.colorType1 }}>
                        No pokédex entry found for this pokemon.
                    </span>
                </div>
            ) : (
                <Tabs
                    vertical={true}
                    color={types}
                    className={"font-bold uppercase"}
                    role="tabpanel"
                >
                    {groupData.map((flavor, key) => (
                        <Tab
                            className="w-full"
                            key={`flavor-${key}`}
                            title={`${flavor.version.name}`}
                            role="tab"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-full min-w-min"
                            >
                                <h6 className="text-xl mb-2 font-bold">
                                    Pokédex entry{" "}
                                    <span className="italic capitalize">
                                        {flavor.version.name}
                                    </span>
                                </h6>
                                <p className="space-x-3 text-center max-sm:text-sm">
                                    {flavor.flavor_text}
                                </p>
                            </motion.div>
                        </Tab>
                    ))}
                </Tabs>
            )}
        </>
    );
};

export default PokemonGameIndex;
