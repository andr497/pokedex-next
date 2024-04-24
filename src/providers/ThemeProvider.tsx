"use client";
import { ThemeProvider as NextThemesProviders } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProviders {...props}>{children}</NextThemesProviders>;
}
