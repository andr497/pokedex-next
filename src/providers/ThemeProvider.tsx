"use client";
import {
    ThemeProvider as NextThemesProviders,
    ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProviders {...props}>{children}</NextThemesProviders>;
}
