import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Navbar from "components/Navbar";
import ProviderWrapper from "components/ProviderWrapper";

const font = Roboto({weight: "400", subsets: []});

export const metadata: Metadata = {
    title: "Pokedex",
    description: "Pokedex Application"
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
            </head>
            <body
                className={`${font.className} theme-mode duration-500`}
                suppressHydrationWarning={true}
            >
                <ProviderWrapper>
                    <Navbar />
                    <main className="container">{children}</main>
                </ProviderWrapper>
            </body>
        </html>
    );
}
