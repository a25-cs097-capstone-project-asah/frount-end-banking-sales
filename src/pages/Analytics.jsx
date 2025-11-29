import React, { useState } from "react";
import { toggleTheme } from "../theme";

const Analytics = () => {
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  return (
    <>
      <div className="top-header">
        <div className="header-left">
          <h1>Analytics & Insights</h1>
        </div>

        <div className="header-right">
          <button
            className="header-icon"
            type="button"
            onClick={handleToggleTheme}
            aria-label="Toggle Theme"
          >
            <i className={isLight ? "fas fa-sun" : "fas fa-moon"} />
          </button>
        </div>
      </div>

      <div className="leads-content" style={{ paddingTop: "20px" }}>
        <div
          className="chart-card"
          style={{ padding: "30px", textAlign: "center" }}
        >
          <h3>Analytics Belum Tersedia</h3>
          <p style={{ marginTop: "10px" }}>
            Fitur analytics belum aktif. Data akan tampil setelah backend
            selesai dibuat.
          </p>
        </div>
      </div>
    </>
  );
};

export default Analytics;
