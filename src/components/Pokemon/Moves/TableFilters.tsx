"use client";
import React from "react";

import { Field, Radio, RadioGroup } from "@headlessui/react";
import { METHODS, VERSION_GROUP } from "@/helpers/constants";
import { MoveLearnMethod } from "@/interfaces/TableMoveTypes";

interface TableRadioFiltersProps {
    method: MoveLearnMethod;
    setMethod: React.Dispatch<React.SetStateAction<MoveLearnMethod>>;
    versionGroup: string;
    setVersionGroup: React.Dispatch<React.SetStateAction<string>>;
}

const TableFilters = ({
    method,
    setMethod,
    versionGroup,
    setVersionGroup,
}: TableRadioFiltersProps) => {
    return (
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-4">
            <div className="w-full md:w-64">
                <label className="block mb-1 text-sm font-medium">
                    Version
                </label>
                <select
                    name="version_group"
                    value={versionGroup}
                    onChange={(e) => setVersionGroup(e.target.value)}
                    className="appearance-none w-full bg-base-100 border border-border text-foreground py-3.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                    <option key="all" value="">
                        All games
                    </option>
                    {VERSION_GROUP.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            <RadioGroup
                value={method}
                onChange={setMethod}
                className="w-full md:flex-1 grid grid-cols-4 items-center gap-2"
            >
                {METHODS.map(({ label, value }) => (
                    <Field key={`label-method-${value}`} className="w-full">
                        <Radio
                            value={value}
                            className="group relative h-full flex cursor-pointer rounded bg-border/40 py-2 px-3 text-foreground shadow-sm transition duration-300 focus:outline-none data-focus:outline-1 data-focus:outline-primary data-checked:bg-primary data-checked:text-primary-content hover:bg-border/60 max-sm:p-2"
                        >
                            <div className="flex w-full items-center justify-between">
                                <p className="w-full text-center font-semibold capitalize max-sm:text-xs">
                                    {label}
                                </p>
                            </div>
                        </Radio>
                    </Field>
                ))}
            </RadioGroup>
        </div>
    );
};

export default TableFilters;