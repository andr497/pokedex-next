"use client";
import React from "react";

import { ValueLabel } from "@/interfaces/TableMoveTypes";
import { Field, Radio, RadioGroup } from "@headlessui/react";

interface TableRadioFiltersProps<T extends string> {
    filterState: T;
    setFilterState: React.Dispatch<React.SetStateAction<T>>;
    arrayFilters: Readonly<ValueLabel<T>[]>;
}

const TableRadioFilters = <T extends string>({
    filterState,
    setFilterState,
    arrayFilters,
}: TableRadioFiltersProps<T>) => {
    return (
        <RadioGroup
            value={filterState}
            onChange={setFilterState}
            className={
                "w-full grid grid-cols-4 justify-center items-center gap-2 my-2"
            }
        >
            {arrayFilters.map(({ label, value }) => (
                <Field key={`label-method-${value}`} className={"w-full"}>
                    <Radio
                        value={value}
                        className="group 
                        relative h-full flex cursor-pointer rounded 
                        bg-gray-700 py-4 px-5 text-white shadow-md transition 
                        focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-gray-800
                        hover:bg-blue-500 duration-300
                        max-sm:p-2
                        "
                    >
                        <div className="flex w-full items-center justify-between">
                            <p className="w-full text-center font-semibold text-white capitalize max-sm:text-xs">
                                {label}
                            </p>
                        </div>
                    </Radio>
                </Field>
            ))}
        </RadioGroup>
    );
};

export default TableRadioFilters;
