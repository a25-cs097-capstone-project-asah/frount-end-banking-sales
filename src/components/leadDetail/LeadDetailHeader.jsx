import React, { useState } from "react";
import { toggleTheme } from "../../theme";

const LeadDetailHeader = ({ onBack }) => {
  const [isLight, setIsLight] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("light");
  });

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  return (
    <div className="detail-header-row">
      <div className="detail-header-left">
        <button className="btn btn-outline btn-back" onClick={onBack}>
          <i className="fas fa-arrow-left" />
          <span>Kembali</span>
        </button>
        <h1>Detail Nasabah</h1>
      </div>

      <div className="detail-header-actions">
        <button
          className="header-icon"
          type="button"
          onClick={handleToggleTheme}
          aria-label="Toggle theme"
          style={{ marginLeft: "8px" }}
        >
          <i className={isLight ? "fas fa-sun" : "fas fa-moon"} />
        </button>
      </div>
    </div>
  );
};

export default LeadDetailHeader;
