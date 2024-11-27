import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const createPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Maximal anzuzeigende Seiten in der Mitte
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjustiere startPage, wenn endPage das Maximum erreicht
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {totalPages > pages[pages.length - 1] && (
        <>
          <span>...</span>
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
