"use client";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleClick = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (
        <button 
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700`} 
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
