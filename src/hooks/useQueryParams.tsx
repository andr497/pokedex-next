import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IKeysParamsObject {
    [key: string]: string | number | null;
}

export default function useQueryParams<T>(
    initialParams: IKeysParamsObject = {}
) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const urlSearchParams = new URLSearchParams(searchParams?.toString());

    const setQueryParams = (params: Partial<T>) => {
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                urlSearchParams.delete(key);
            } else {
                urlSearchParams.set(key, String(value));
            }
        });

        const search = urlSearchParams.toString();
        const query = search ? `?${search}` : "";

        router.replace(`${pathname}${query}`);
    };

    const queryParams: IKeysParamsObject = initialParams;
    Object.entries(initialParams).forEach(([key, defaultValue]) => {
        const newValue = searchParams.get(key);
        queryParams[key] = searchParams.has(key) ? newValue : defaultValue;
    });

    return {
        queryParams,
        setQueryParams,
    };
}
