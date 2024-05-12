import { NamedAPIResource } from "@/interfaces/PokeApi/CommonModels";
import React from "react";

interface Props {
    label: string;
    list: NamedAPIResource[];
}

const Counter = ({ label, list }: Props) => {
    const numberOfElements = list.length;

    return (
        <div className="grow basis-0 md:w-1/4 sm:w-1/2 max-sm:w-fit max-sm:min-w-32 cursor-default">
            <div className="border-2 border-gray-600 px-4 py-6 rounded">
            <h2 className="title-font font-medium text-3xl text-gray-200 max-sm:text-md">{numberOfElements}</h2>
            <p className="leading-relaxed max-sm:text-sm">{label}</p>
            </div>
        </div>
    );
};

export default Counter;
