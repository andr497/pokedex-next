"use client";
import { useState } from "react";
import { Variants, motion } from "framer-motion";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import {
    Bars3Icon as MenuIcon,
    XMarkIcon as XIcon,
    MagnifyingGlassIcon as SearchIcon,
} from "@heroicons/react/20/solid";
import { useRecoilState } from "recoil";
import { searchTextPokemonState } from "recoil/atoms";
import { usePathname, useRouter } from "next/navigation";

interface MenuOptions {
    name: string;
    url: string;
}

const animation: Variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
};

const options: MenuOptions[] = [
    {
        name: "Home",
        url: "/",
    },
];

export default function Navbar() {
    const [searchText, setSearchText] = useRecoilState<string>(
        searchTextPokemonState
    );

    const pathname = usePathname();
    const showSearchBar = false;
    return (
        <Disclosure as="nav" className={`dark:bg-gray-800 bg-blue-300`}>
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* MOBILE MENU BUTTON */}

                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded dark:text-gray-400 text-gray-800 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <Image
                                        className="block lg:hidden h-8 w-auto"
                                        width={50}
                                        height={50}
                                        alt="logo"
                                        src="/logo.png"
                                    />
                                    <Image
                                        className="hidden lg:block h-8 w-auto"
                                        width={80}
                                        height={80}
                                        alt="logo"
                                        src="/logo.png"
                                    />
                                    <h1 className="block max-sm:hidden mx-2 font-bold tracking-widest">
                                        Pokédex
                                    </h1>
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {options.map((option) => (
                                            <Link
                                                key={`navigation-option-mobile-${option.name}`}
                                                href={option.url}
                                                className={`text-gray-800 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded text-sm font-medium`}
                                            >
                                                {option.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${
                                    showSearchBar ? "block" : "hidden"
                                } relative`}
                            >
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <SearchIcon className="block h-6 w-6" />
                                    <span className="sr-only">Search icon</span>
                                </div>
                                <input
                                    type="text"
                                    id="search-navbar"
                                    className={`
                                        block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                    `}
                                    placeholder="Search pokemon..."
                                    value={searchText}
                                    onChange={(e) => {
                                        const text = e.currentTarget.value;
                                        setSearchText(text);
                                    }}
                                />
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <ThemeSwitcher />
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {options.map((option) => (
                                <Disclosure.Button
                                    key={`navigation-options-${option.name}`}
                                    as={Link}
                                    href={option.url}
                                    className={`text-gray-800 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                                >
                                    {option.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

// export default function Navbar() {
//     const [navbar, setNavbar] = useState(false);
//     return (
//         <nav className="w-full dark:bg-gray-800 bg-blue-300 shadow shadow-2x-l">
//             <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
//                 <div>
//                     <div className="flex items-center justify-between py-3 md:py-5 md:block">
//                         <Link href="/">
//                             <h2 className="text-2xl text-black font-bold dark:text-white">
//                                 Pokedex
//                             </h2>
//                         </Link>
//                         <div className="md:hidden">
//                             <button
//                                 className={`p-2 dark:text-white text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border`}
//                                 onClick={() => setNavbar(!navbar)}
//                             >
//                                 {!navbar ? (
//                                     <Bars3Icon
//                                         width={30}
//                                         className={`transition-opacity duration-300 ${
//                                             navbar ? "opacity-0" : "opacity-100"
//                                         }`}
//                                     />
//                                 ) : (
//                                     <XMarkIcon
//                                         width={30}
//                                         className={`transition-opacity duration-300 ${
//                                             navbar ? "opacity-100" : "opacity-0"
//                                         }`}
//                                     />
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div
//                         className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//                             navbar ? "block" : "hidden"
//                         }`}
//                     >
//                         <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
//                             {options.map((option, index) => (
//                                 <li className="dark:text-white text-black transition delay-150 duration-300 ease-in-out" key={`menu-${index}`}>
//                                     <Link href={option.url}>{option.name}</Link>
//                                 </li>
//                             ))}
//                             <li>
//                                 <ThemeSwitcher />
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }
