import React from "react";

function generatePagination(current, totalPages, maxVisible = 7) {
  if (totalPages <= maxVisible) {
    return [...Array(totalPages)].map((_, i) => i + 1);
  }

  const first = 1;
  const last = totalPages;
  const pages = [];

  const left = Math.max(current - 1, 2);
  const right = Math.min(current + 1, totalPages - 1);

  pages.push(first);

  if (left > 2) pages.push("...");

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) pages.push("...");

  pages.push(last);

  return pages;
}

const LeadsPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = generatePagination(currentPage, totalPages);

  return (
    <div
      className="pagination-controls"
      style={{
        marginTop: "25px",
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Prev */}
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {/* Number Buttons */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="pagination-dots">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`page-btn ${p === currentPage ? "active" : ""}`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default LeadsPagination;
