import React from "react";

type PagesProps = {
    numberOfPages: number
    currentPage: number
    handlePageChange: (pageNumber: number) => void
}
export default function Pages({ numberOfPages, currentPage, handlePageChange }: PagesProps) {
    const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1)

    return (
        <div className="flex gap-2 w-full justify-center">
            {pages.map(pageNumber =>
                <div key={pageNumber}
                     className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-dark-100 hover:text-purple-100 
                         ${currentPage === pageNumber ? `bg-white` : `bg-none border border-dark-10`}`}
                     onClick={() => handlePageChange(pageNumber)}>
                    <p>{pageNumber}</p>
                </div>
            )}
        </div>)
}