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
        <div className="space-y-6">
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
