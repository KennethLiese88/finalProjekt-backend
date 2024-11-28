import React from "react";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const createPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

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
        className="pg_button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <i className="fa-solid fa-angle-left"></i> Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : "pg_button"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {totalPages > pages[pages.length - 1] && (
        <>
          <span>...</span>
          <button
            className="pg_button"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="pg_button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
