"use client";
import React, { useState } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import useStats from "@/hooks/useStats";
import { StatsPokemon } from "interfaces/IPokemonDetails";
import { StatsPokemonCalculated } from "helpers/PokemonStatsHelper";

import ProgressBar from "./ProgressBar/ProgressBar";
import { StatsPokemonClean } from "./../helpers/PokemonStatsHelper";
import { motion } from 'framer-motion';

interface Props {
    stats: {
        id: number;
        stats_details: StatsPokemon[];
    };
    types: { colorType1: string; colorType2: string };
}

type OptionsStats = keyof StatsPokemonCalculated;

const PokemonStats = ({ stats, types }: Props) => {
    const [selected, setSelected] = useState<number>(0);
    const { valueStats } = useStats({ stats });

    return (
        <TabGroup
            onChange={(index) => {
                setSelected(index);
            }}
            defaultIndex={0}
            selectedIndex={selected}
        >
            <TabList>
                {valueStats &&
                    Object.keys(valueStats).map((title, index) => (
                        <Tab
                            key={`stats-button-${index}`}
                            className={`inline-block p-4 capitalize ring-0 focus:outline-none ${
                                selected === index
                                    ? "active font-bold"
                                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            } border-b-2 rounded-t-lg`}
                            style={{
                                color:
                                    selected === index ? types.colorType1 : "",
                                borderColor:
                                    selected === index ? types.colorType1 : "",
                            }}
                        >
                            {title}
                        </Tab>
                    ))}
            </TabList>

            <TabPanels className="sm:w-max-[300px]">
                {valueStats &&
                    Object.entries(valueStats).map(
                        (
                            [key, stats]: [string, StatsPokemonClean[]],
                            stats_index
                        ) => {
                            return (
                                <TabPanel
                                    key={`tab-panel-${key}`}
                                    hidden={selected !== stats_index}
                                >
                                    {stats.map((stat, stat_index) => (
                                        <motion.div
                                        
                                            key={`stats-bar-${selected}-${stat_index}`}
                                        >
                                            <ProgressBar
                                                color={types}
                                                title={stat.name}
                                                value={stat.base_stat}
                                                percentage={stat.percentage!}
                                            />
                                        </motion.div>
                                    ))}
                                </TabPanel>
                            );
                        }
                    )}
            </TabPanels>
        </TabGroup>
    );
};

export default PokemonStats;
