import React, { useState } from "react";
import { toggleTheme } from "../../theme";

const LeadsHeader = ({ search, onSearchChange }) => {
  const [isLight, setIsLight] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("light");
  });

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  return (
    <div className="top-header">
      <div className="header-left">
        <h1>Daftar Lead</h1>
      </div>

      <div className="header-right">
        {/* Search box */}
        <div className="search-box">
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Cari nasabah..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Theme toggle */}
        <button
          className="header-icon"
          type="button"
          onClick={handleToggleTheme}
          aria-label="Toggle theme"
        >
          <i className={isLight ? "fas fa-sun" : "fas fa-moon"} />
        </button>
      </div>
    </div>
  );
};

export default LeadsHeader;
