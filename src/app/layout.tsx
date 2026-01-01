import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import ProviderWrapper from "@/components/ProviderWrapper";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const font = Roboto({ weight: "400", subsets: [] });

export const metadata: Metadata = {
    title: "Pokedex",
    description: "Pokedex Application",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link
                    rel="shortcut icon"
                    href="/logo.png"
                    type="image/x-icon"
                />
            </head>
            <body
                className={`${font.className} min-h-screen font-display text-foreground dark:text-white flex flex-col`}
                suppressHydrationWarning={true}
            >
                <ProviderWrapper>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </ProviderWrapper>
            </body>
        </html>
    );
}
