"use client";
import { useState, useEffect } from "react";
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
            className={`w-fit flex justify-center align-middle rounded-md hover:scale-110 active:scale-100 duration-200 dark:bg-[#212933]`}
            onClick={handleClick}
        >
            {theme === "light" ? (
                <>
                    <MoonIcon width={25} />
                    <span className="ml-1">Dark</span>
                </>
            ) : (
                <>
                    <SunIcon width={25} />
                    <span className="ml-1">Light</span>
                </>
            )}
        </button>
    );
};

export default ThemeSwitcher;
