import React from "react";

// ==========================================
// Pagination Number Generator (Dengan Ellipsis)
// ==========================================
function generatePagination(current, totalPages, maxVisible = 7) {
  // Jika total halaman sedikit → tampilkan semuanya
  if (totalPages <= maxVisible) {
    return [...Array(totalPages)].map((_, i) => i + 1);
  }

  const first = 1;
  const last = totalPages;
  const pages = [];

  // Range kiri & kanan (centered)
  const left = Math.max(current - 1, 2);
  const right = Math.min(current + 1, totalPages - 1);

  pages.push(first); // halaman pertama

  if (left > 2) pages.push("..."); // ellipsis kiri

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) pages.push("..."); // ellipsis kanan

  pages.push(last); // halaman terakhir

  return pages;
}

// ==========================================
// Pagination Component
// ==========================================
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
