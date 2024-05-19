import { useMemo } from "react";

import { LIMIT_PAGE } from "helpers/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import "@/styles/pagination.css";

interface PaginationProps {
    itemsPerPage?: number;
    totalItems?: number;
    currentPage?: number;
    maxPagesToShow?: number;
    setCurrentPage: (page: number) => void;
    nextPage: (currentPage: number, lastPage: number) => void;
    prevPage: (currentPage: number) => void;
}

const Pagination = ({
    itemsPerPage = LIMIT_PAGE,
    totalItems = 0,
    currentPage = 1,
    maxPagesToShow = 2,
    setCurrentPage,
    nextPage,
    prevPage,
}: PaginationProps) => {
    const numberOfPages = useMemo(
        () => Math.ceil(totalItems / itemsPerPage),
        [totalItems, itemsPerPage]
    );
    const pages = [];

    const offset = (currentPage - 1) * itemsPerPage;

    for (let page = 1; page <= numberOfPages; page++) {
        if (
            page === 1 ||
            page === numberOfPages ||
            (page >= currentPage - maxPagesToShow &&
                page <= currentPage + maxPagesToShow)
        ) {
            pages.push(page);
        } else if (pages[pages.length - 1] !== "...") {
            pages.push("...");
        }
    }

    return (
        <div className="xl:col-span-6 lg:col-span-4 md:col-span-3 sm:col-span-2 xs:col-span-1 gap-4">
            <div className="flex items-center justify-between py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        type="button"
                        onClick={() => {
                            prevPage(currentPage);
                        }}
                        className="page-item"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            nextPage(currentPage, numberOfPages);
                        }}
                        className="page-item"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700 dark:text-white">
                            Showing{" "}
                            <span className="font-medium">{offset + 1}</span> to{" "}
                            <span className="font-medium">
                                {currentPage === numberOfPages
                                    ? totalItems
                                    : itemsPerPage + offset}
                            </span>{" "}
                            of <span className="font-medium">{totalItems}</span>{" "}
                            results
                        </p>
                    </div>
                    <div>
                        <nav
                            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                            aria-label="Pagination"
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    prevPage(currentPage);
                                }}
                                className="page-item"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                            {pages.map((value, key) => {
                                const activePage =
                                    currentPage === value ? "active-page " : "";
                                //const disabled = value === "...";
                                return (
                                    <button
                                        key={`page-${key}`}
                                        aria-current="page"
                                        className={`${activePage}page-item`}
                                        onClick={() => {
                                            if (typeof value === "number") {
                                                setCurrentPage(value);
                                            }
                                        }}
                                        disabled={value === "..."}
                                    >
                                        {value}
                                    </button>
                                );
                            })}
                            <button
                                type="button"
                                className="page-item"
                                onClick={() => {
                                    nextPage(currentPage, numberOfPages);
                                }}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
