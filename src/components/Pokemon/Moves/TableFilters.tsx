"use client";
import React from "react";

import { SelectFetch } from "@/components/Select/SelectFetch";
import { VersionGroup } from "@/interfaces/TableMoveTypes";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import { METHODS } from "@/helpers/constants";

interface TableRadioFiltersProps<T extends string> {
    method: T;
    setMethod: React.Dispatch<React.SetStateAction<T>>;
    versionGroup: VersionGroup;
    setVersionGroup: React.Dispatch<React.SetStateAction<VersionGroup>>;
}

const TableFilters = <T extends string>({
    method,
    setMethod,
    versionGroup,
    setVersionGroup,
}: TableRadioFiltersProps<T>) => {
    return (
        <>
            <SelectFetch
                name="version_group"
                label="Versión"
                endpoint="/api/version-group"
                value={versionGroup}
                valueKey="value"
                labelKey="label"
                onChange={(value) => setVersionGroup(value as VersionGroup)}
            />

            <RadioGroup
                value={method}
                onChange={setMethod}
                className={
                    "w-full grid grid-cols-4 justify-center items-center gap-2 my-2"
                }
            >
                {METHODS.map(({ label, value }) => (
                    <Field key={`label-method-${value}`} className={"w-full"}>
                        <Radio
                            value={value}
                            className="group 
                        relative h-full flex cursor-pointer rounded 
                        bg-gray-700 py-4 px-5 text-white shadow-md transition 
                        focus:outline-none data-focus:outline-1 data-focus:outline-white data-checked:bg-gray-800
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
        </>
    );
};

export default TableFilters;
