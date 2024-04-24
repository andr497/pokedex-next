export type UseSelectOptionsParams<Option> = {
    options: readonly Option[];
    getLabel: (option: Option) => string;
};

export function useSelectOptions<Option>({
    options,
    getLabel,
}: UseSelectOptionsParams<Option>) {
    return (
        <>
            {options.map((option, index) => {
                let value = index;
                if (typeof option === "object") {
                    if (Object.hasOwn(option, "id")) {
                        value = option["id"];
                    }
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
