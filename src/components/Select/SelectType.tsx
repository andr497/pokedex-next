"use client";
import React, { ComponentPropsWithRef } from "react";

import useSWR from "swr";

import { Select } from "@headlessui/react";
import { getAllPokemonTypes } from "@/api/types";

type SelectProps = ComponentPropsWithRef<"select">;

const SelectType = ({ ...selectProps }: SelectProps) => {
    const { data: options } = useSWR(
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
