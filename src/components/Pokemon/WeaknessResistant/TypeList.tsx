"use client";

import TypeElement from "./TypeElement";
import {
    TypeEffectiveness,
    TypeMultiplier,
} from "@/server/TypePokemonRepository";

interface Props {
    data: TypeEffectiveness;
}

const TypeList = ({ data }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(data).map(
                ([key, values]: [string, TypeMultiplier[]]) => (
                    <TypeElement
                        key={`typing-weakness-${key}`}
                        types={values}
                        label={key}
                    />
                ),
            )}
        </div>
    );
};

export default TypeList;
