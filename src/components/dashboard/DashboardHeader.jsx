import React, { useState } from "react";
import { toggleTheme } from "../../theme";

const DashboardHeader = () => {
  // baca tema awal
  const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light")
  );

  // tombol toggle tema
  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <h1>Dashboard</h1>
      </div>

      <div className="header-right">
        {/* THEME TOGGLE BUTTON */}
        <button
          className="header-icon"
          type="button"
          onClick={handleToggleTheme}
        >
          <i className={isLight ? "fa-solid fa-sun" : "fa-solid fa-moon"} />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
