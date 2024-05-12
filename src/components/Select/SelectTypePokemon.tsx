import React, { useState } from "react";
import SelectBase from "./SelectBase";
import { NamedAPIResourceWithId } from "interfaces/PokeApi/CommonModels";

const getLabel = ({ name }: NamedAPIResourceWithId) => {
    return name.charAt(0).toUpperCase() + name.substring(1, name.length);
};

const initialState: NamedAPIResourceWithId = {
    id: "",
    name: "",
};

interface Props {
    options: NamedAPIResourceWithId[];
    primaryTypeOption: NamedAPIResourceWithId;
    setPrimaryTypeOption: React.Dispatch<
        React.SetStateAction<NamedAPIResourceWithId>
    >;
    secondaryTypeOption: NamedAPIResourceWithId;
    setSecondaryTypeOption: React.Dispatch<
        React.SetStateAction<NamedAPIResourceWithId>
    >;
}

const SelectTypePokemon = ({
    options,
    primaryTypeOption,
    setPrimaryTypeOption,
    secondaryTypeOption,
    setSecondaryTypeOption,
}: Props) => {
    return (
        <section className="flex justify-start gap-2">
            <label>
                <span>Select primary type</span>
                <SelectBase
                    name="filter-pokemon-primary-type"
                    selectedOption={primaryTypeOption}
                    options={options ?? []}
                    getLabel={getLabel}
                    onChange={setPrimaryTypeOption}
                    idKey="id"
                />
            </label>

            <label>
                <span>Select secondary type</span>
                <SelectBase
                    name="filter-pokemon-secondary-type"
                    selectedOption={secondaryTypeOption}
                    options={options ?? []}
                    getLabel={getLabel}
                    onChange={setSecondaryTypeOption}
                    idKey="id"
                />
            </label>
        </section>
    );
};

export default SelectTypePokemon;
