"use client";
import React from "react";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/20/solid";
import SelectType from "@/components/Select/SelectType";

interface Props {
    placeholder: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleFiltersChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const SearchFilters = ({
    handleFiltersChange,
    handleChange,
    placeholder,
}: Props) => {
    return (
        <section className="w-full flex flex-col gap-4">
            <div className="w-full">
                <SelectType
                    name="types"
                    aria-label="pokemon-types"
                    onChange={handleFiltersChange}
                />
            </div>
            <div className="relative grid grid-cols-1">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon className="block h-6 w-6" />
                    <span className="sr-only">Search icon</span>
                </div>
                <input
                    type="text"
                    className={`w-full p-2 ps-10 text-gray-900 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    onChange={handleChange}
                    placeholder={`${placeholder}`}
                />
            </div>
        </section>
    );
};

export default SearchFilters;
