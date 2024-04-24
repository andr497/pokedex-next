import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "../loading";
import { Loader, Rectangular } from "components/Skeleton";

const Search = dynamic(() => import("components/Search/Search"), {
    ssr: false,
    loading: () => (
        <Loader className="w-full">
            <Rectangular
                height={65}
                elements={1}
                className="flex items-center justify-center bg-gray-300 dark:bg-gray-200 rounded-md dark:opacity-50"
            />
        </Loader>
    ),
});

export async function generateMetadata() {
    return {
        title: `Pokedex - Search`,
    };
}

export default async function SearchPage() {
    return (
        <Suspense fallback={<Loading />}>
            <section className="flex flex-col justify-center items-center" style={{ height: "80svh" }}>
                <div className="text-center">
                    <h1 className="text-4xl">Search </h1>
                </div>
                <div className="w-full flex items-center justify-between gap-2 mt-4">
                    <Search placeholder="Search pokemon..." />
                </div>
            </section>
        </Suspense>
    );
}
