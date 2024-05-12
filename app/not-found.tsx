import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <section className="flex flex-col items-center">
                <Image
                    alt="Page not Found - Pikachu"
                    src="/PikachuNotFound.png"
                    height={400}
                    width={400}
                    className="aspect-auto max-sm:w-52"
                />
                <h2 className="mb-6 font-medium font-heading xl:text-9xl lg:text-8xl md:text-7xl text-5xl leading-tight">
                    Not Found
                </h2>
                <p className="mx-w-md mb-20 xl:mb-24 mx-auto font-heading font-medium xl:text-3xl sm:text-xl">
                    The page you are looking for was not found.
                </p>
                <Link href="/" className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 rounded px-4 py-2">Back to Home</Link>
            </section>
        </main>
    );
}
