"use client";
import React from "react";

import { useRecoilState } from "recoil";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

import { useRouter } from "next/navigation";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import {
    Bars3Icon as MenuIcon,
    MagnifyingGlassIcon as SearchIcon,
    XMarkIcon as XIcon,
} from "@heroicons/react/20/solid";

import BrandImage from "./BrandImage";
import InputSearch from "./InputSearch";
import { searchTextPokemonState } from "@/recoil/atoms";
import ThemeSwitcher from "../ThemeSwitcher";
import Link from "next/link";

interface MenuOptions {
    name: string;
    url: string;
}

const options: MenuOptions[] = [
    {
        name: "Home",
        url: "/",
    },
];

const Navbar = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useRecoilState<string>(
        searchTextPokemonState
    );

    const handleSearch = (text: string) => {
        router.replace(`/pokemon?q=${text}`);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setSearchText(text);
    };

    return (
        <Disclosure
            as="nav"
            className="bg-white border-b-2 border-gray-300 dark:border-0 dark:bg-gray-800"
        >
            {({ open }) => (
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <BrandImage />

                    <div className="flex md:order-2">
                        <ThemeSwitcher />
                        <InputSearch
                            formClassName="relative hidden md:block"
                            placeholder="Search Pokémon..."
                            onSearch={(e) => {
                                e.preventDefault();
                                handleSearch(searchText);
                            }}
                            value={searchText}
                            onChange={handleOnChange}
                        />
                        <DisclosureButton className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="w-5 h-5" />
                        </DisclosureButton>
                    </div>

                    <AnimatePresence>
                        {open && (
                            <DisclosurePanel
                                as={motion.div}
                                initial={{ opacity: 0, y: -24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -24 }}
                                transition={{ duration: 0.2, ease: easeInOut }}
                                className="items-center justify-center w-full md:flex md:w-auto md:order-1"
                            >
                                <InputSearch
                                    formClassName="relative mt-3 md:hidden"
                                    placeholder="Search Pokémon..."
                                    onSearch={(e) => {
                                        e.preventDefault();
                                        handleSearch(searchText);
                                    }}
                                    value={searchText}
                                    onChange={handleOnChange}
                                />
                                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    {options.map((option) => (
                                        <li
                                            key={`navigation-options-${option.name}`}
                                        >
                                            <DisclosureButton
                                                as={Link}
                                                href={option.url}
                                                className={`text-gray-800 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                                            >
                                                {option.name}
                                            </DisclosureButton>
                                        </li>
                                    ))}
                                </ul>
                            </DisclosurePanel>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </Disclosure>
    );
};

export default Navbar;
