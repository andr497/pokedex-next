"use client";

import { useEffect, useState } from "react";

import { Generation } from "@/interfaces/PokeApi/IGenerations";
import GenerationCard from "./Card";
import { Loading } from "@/components/Loading";
import { getGenerations } from "@/api/generation";
import useSWR from "swr";

const GenerationGrid = () => {
    const { data, isLoading } = useSWR("1", getGenerations);
    const [generations, setGenerations] = useState<Generation[]>([]);

    useEffect(() => {
        if (data) {
            setGenerations(data);
        }
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <section className="p-2 mb-1">
                <h1 className={`text-7xl text-center max-sm:text-4xl`}>
                    Choose a generation
                </h1>
            </section>
            <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 place-items-center">
                {generations.map((generation, key) => {
                    return (
                        <GenerationCard
                            key={`generation-${key}`}
                            generation={generation}
                        />
                    );
                })}
            </section>
        </>
    );
};

export default GenerationGrid;
