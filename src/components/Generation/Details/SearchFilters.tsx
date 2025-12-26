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
        <section className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="block h-5 w-5" />
                    <span className="sr-only">Search icon</span>
                </div>
                <input
                    type="text"
                    className={`block w-full pl-12 pr-4 py-3.5 bg-base-100 border border-border rounded-lg text-foreground placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
                    onChange={handleChange}
                    placeholder={`${placeholder}`}
                />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
                <div className="relative min-w-40">
                    <SelectType
                        name="types"
                        aria-label="pokemon-types"
                        onChange={handleFiltersChange}
                    />
                </div>
            </div>
            <div className="relative grid grid-cols-1"></div>
        </section>
    );
};

export default SearchFilters;
