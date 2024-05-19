import { SelectHTMLAttributes } from "react";
import { useSelect, UseSelectParams } from "hooks/useSelect";
import {
    useSelectOptions,
    UseSelectOptionsParams,
} from "hooks/useSelectOptions";

type SelectProps = Pick<SelectHTMLAttributes<HTMLSelectElement>, "name">;

const SelectBase = <Option,>({
    selectedOption,
    options,
    onChange,
    getLabel,
    idKey,
    ...props
}: UseSelectOptionsParams<Option> & UseSelectParams<Option> & SelectProps) => {
    const selectProps = useSelect({ selectedOption, options, onChange });
    const selectOptions = useSelectOptions({ options, getLabel, idKey });
    return (
        <>
            <select
                {...props}
                {...selectProps}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
                {selectOptions}
            </select>
        </>
    );
};

export default SelectBase;
