"use client";

import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

import { useSyncExternalStore } from "react";

function useMounted() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

const ThemeSwitcher = () => {
    const mounted = useMounted();
    const { theme, setTheme } = useTheme();

    const handleClick = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    if (!mounted) return null;

    return (
        <button
            className={`inline-flex items-center p-1 w-8 h-8 justify-center text-sm 
                rounded cursor-pointer
                hover:bg-surface
                focus:outline-none`}
            onClick={handleClick}
        >
            {theme === "light" ? (
                <MoonIcon className="w-5 h-5" />
            ) : (
                <SunIcon className="w-5 h-5" />
            )}

            <span className="sr-only">Set theme - {theme}</span>
        </button>
    );
};

export default ThemeSwitcher;
