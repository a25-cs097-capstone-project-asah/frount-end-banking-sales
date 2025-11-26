import React, { useState } from "react";
import { toggleTheme } from "../../theme";

const DashboardHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light")
  );

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  // tombol untuk toggle tema
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
        {/* SEARCH BOX */}
        <div className="search-box">
          <i className="fas fa-search" />
          <input type="text" placeholder="Cari nasabah..." />
        </div>

        {/* THEME TOGGLE BUTTON DI HEADER */}
        <button
          className="header-icon"
          type="button"
          onClick={handleToggleTheme}
        >
          <i className={isLight ? "fas fa-sun" : "fas fa-moon"} />
        </button>

        {/* NOTIFICATION ICON */}
        <button
          className="header-icon"
          type="button"
          onClick={toggleNotifications}
        >
          <i className="fas fa-bell" />
          <span className="notification-badge">5</span>
        </button>

        {/* NOTIFICATION DROPDOWN */}
        <div
          className={`notifications-dropdown ${showNotifications ? "open" : ""}`}
        >
          <div className="dropdown-header">
            <h3>Notifikasi</h3>
            <button className="btn-text">Tandai semua dibaca</button>
          </div>

          <div className="notification-item unread">
            <i className="fas fa-user-plus" />
            <div>
              <p>
                <strong>Lead baru</strong> telah ditambahkan
              </p>
              <span>5 menit lalu</span>
            </div>
          </div>

          <div className="notification-item unread">
            <i className="fas fa-check-circle" />
            <div>
              <p>
                Follow up dengan <strong>Budi Santoso</strong> berhasil
              </p>
              <span>1 jam lalu</span>
            </div>
          </div>

          <div className="notification-item">
            <i className="fas fa-chart-line" />
            <div>
              <p>
                Konversi minggu ini meningkat <strong>15%</strong>
              </p>
              <span>2 jam lalu</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
