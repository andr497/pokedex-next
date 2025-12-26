"use client";
import { ComponentPropsWithRef } from "react";

import useSWR from "swr";

import { Select } from "@headlessui/react";
import { getAllPokemonTypes } from "@/api/types";

type SelectProps = ComponentPropsWithRef<"select">;

const SelectType = ({ ...selectProps }: SelectProps) => {
    const { data: options } = useSWR({ limit: 18 }, getAllPokemonTypes);

    return (
        <>
            <Select
                className={
                    "appearance-none w-full bg-base-100 border border-border text-foreground py-3.5 pl-4 pr-10 rounded-lg focus:outline-none focus:right-2 focus:ring-primary cursor-pointer"
                }
                {...selectProps}
            >
                <option className="capitalize font-sans font-bold" value={""}>
                    Select a pokemon type
                </option>
                {options &&
                    options.map((option) => (
                        <option
                            className="capitalize font-sans"
                            key={`select-option-${option.name}`}
                            value={option.name}
                        >
                            {option.name}
                        </option>
                    ))}
            </Select>
        </>
    );
};

export default SelectType;
