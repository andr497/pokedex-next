"use client";

import React from "react";
import useSWR from "swr";

type DefaultOption = {
    value: string;
    label: string;
};

type SelectProps<T = any> = {
    name: string;
    label?: string;

    // Opciones manuales
    options?: T[];

    // Endpoint opcional para SWR
    endpoint?: string;

    // Función fetch personalizada (opcional)
    fetcher?: (url: string) => Promise<T[]>;

    // Mapeo configurable
    valueKey?: keyof T;
    labelKey?: keyof T;

    // Si quieres transformar manualmente
    transform?: (item: T) => DefaultOption;

    placeholder?: string;
    disabled?: boolean;
    className?: string;

    value?: string;
    onChange?: (value: string) => void;
};

const defaultFetcher = (url: string) => fetch(url).then((res) => res.json());

export function SelectFetch<T>({
    name,
    label,
    options,
    endpoint,
    fetcher = defaultFetcher,
    valueKey = "value" as keyof T,
    labelKey = "label" as keyof T,
    transform,
    placeholder = "Seleccionar...",
    disabled = false,
    className = "",
    value,
    onChange,
}: SelectProps<T>) {
    const { data, isLoading, error } = useSWR<T[]>(endpoint ?? null, fetcher);

    const sourceData = options ?? data ?? [];

    const parsedOptions: DefaultOption[] = sourceData.map((item) => {
        if (transform) return transform(item);

        return {
            value: String(item[valueKey] ?? ""),
            label: String(item[labelKey] ?? ""),
        };
    });

    return (
        <div className="w-full">
            {label && (
                <label className="block mb-1 text-sm font-medium">
                    {label}
                </label>
            )}

            <select
                name={name}
                disabled={disabled || isLoading || error}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className={`appearance-none w-full bg-base-100 border border-border text-foreground py-3.5 pl-4 pr-10 rounded-lg focus:outline-none focus:right-2 focus:ring-primary cursor-pointer
        ${className}`}
            >
                <option value="">
                    {isLoading ? "Cargando..." : placeholder}
                </option>

                {parsedOptions.map((opt) => (
                    <option
                        key={opt.value}
                        value={opt.value}
                        className="capitalize font-sans"
                    >
                        {opt.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="my-2 text-xs text-red-500">
                    Error cargando datos
                </p>
            )}
        </div>
    );
}
