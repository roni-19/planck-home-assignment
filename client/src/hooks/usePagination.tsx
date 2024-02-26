import { useState } from "react";

export const usePagination = (itemsPerPage: number, initialPage: number) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const paginate = (data: any[]) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    return {
        currentPage,
        goToPage,
        paginate,
    };
}