function Pagination({ currentPage, totalPages, setCurrentPage }) {
    return (
        <div className="text-right">
            <button
                key="prev"
                className={`w-[30px] py-1`}
                onClick={() => setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : currentPage)}
            >
                {"<"}
            </button>
            {totalPages <= 5 ? (
                // Afficher toutes les pages si le nombre total de pages est de 5 ou moins
                Array.from({ length: totalPages }, (_, pageIndex) => (
                    <button
                        key={pageIndex}
                        className={`w-[30px] py-1 ${currentPage === pageIndex + 1 ? `text-gray-600` : ""}`}
                        onClick={() => setCurrentPage(pageIndex + 1)}
                    >
                        {pageIndex + 1}
                    </button>
                ))
            ) : (
                // Afficher les 5 pages dynamiquement
                <>
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, pageIndex) => {
                        let page;
                        if (currentPage >= 5) {
                            if (pageIndex === 0) {
                                page = 1;
                            } else if (pageIndex === 1) {
                                page = "...";
                            } else {
                                page = currentPage - 3 + pageIndex;
                            }
                        } else {
                            page = pageIndex + 1;
                        }

                        if (currentPage <= totalPages - 4) {
                            if (pageIndex === 5) {
                                page = "...";
                            } else if (pageIndex === 6) {
                                page = totalPages;
                            }
                        }

                        return (
                            <button
                                key={pageIndex}
                                className={`w-[30px] py-1 ${currentPage === page ? `text-gray-600` : ""}`}
                                onClick={() => setCurrentPage(page)}
                                disabled={typeof page !== "number" || page > totalPages}
                            >
                                {typeof page === "number" && page > totalPages ? "" : page}
                            </button>
                        );
                    })}
                </>
            )}
            <button
                key="next"
                className={`w-[30px] py-1`}
                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
            >
                {">"}
            </button>
        </div>
    );
}

export default Pagination;
