export type UseSelectOptionsParams<Option> = {
    options: readonly Option[];
    getLabel: (option: Option) => string;
    idKey: keyof Option;
};

export function useSelectOptions<Option>({
    options,
    getLabel,
    idKey,
}: UseSelectOptionsParams<Option>) {
    return (
        <>
            {options.map((option, index) => {
                let value: number | string = index;
                if (option) {
                    value = option[idKey] as string;
                }

                return (
                    <option key={index} value={value}>
                        {getLabel(option)}
                    </option>
                );
            })}
        </>
    );
}
