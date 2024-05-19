"use client";
import React, { ComponentPropsWithRef } from "react";

import useSWR from "swr";

import { getAllPokemonTypes } from "@/api/types";
import { NamedAPIResourceWithId } from "@/interfaces/PokeApi/CommonModels";

import SelectBase from "./SelectBase";
import { Select } from "@headlessui/react";
import IconSvg from "../StyledComponents/IconSvg";

const getLabel = ({ name }: NamedAPIResourceWithId) => {
    return name.charAt(0).toUpperCase() + name.substring(1, name.length);
};

type SelectProps = ComponentPropsWithRef<"select">;

const SelectType = ({ ...selectProps }: SelectProps) => {
    const { data: options, isLoading } = useSWR(
        { limit: 18 },
        getAllPokemonTypes
    );

    return (
        <>
            <Select
                className={
                    "capitalize p-2 text-gray-900 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
