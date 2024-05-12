import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFouxnd() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <section className="flex flex-col items-center">
                <Image
                    alt="Page not Found - Pikachu"
                    src="/PikachuNotFound.png"
                    height={400}
                    width={400}
                />
                <h2 className="mb-6 font-medium font-heading text-9xl md:text-10xl xl:text-smxl leading-tight">
                    Not Found
                </h2>
                <p className="mx-w-md mb-20 xl:mb-24 mx-auto font-heading font-medium text-3xl">
                    The page you are looking for was not found.
                </p>
                <Link href="/" className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 rounded px-4 py-2">Back to Home</Link>
            </section>
        </main>
    );
}
