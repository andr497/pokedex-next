import { ChangeEvent, useCallback } from "react";

export type UseSelectParams<Option> = {
    selectedOption: Option;
    options: readonly Option[];
    onChange: (option: Option) => void;
};

type UseSelect = {
    value: number;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function useSelect<Option>({
    selectedOption,
    options,
    onChange,
}: UseSelectParams<Option>): UseSelect {
    const onChangeCallback = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            const nextOption = options[event.currentTarget.selectedIndex];

            if (nextOption !== undefined) {
                onChange(nextOption);
            }
        },
        [options, onChange]
    );

    return {
        value: options.indexOf(selectedOption),
        onChange: onChangeCallback,
    };
}
