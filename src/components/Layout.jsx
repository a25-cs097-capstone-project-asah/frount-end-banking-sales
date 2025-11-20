import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { sidebarCounts } from "../data/dashboardMock";
import { toggleTheme } from "../theme";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Langsung baca class "light" di html saat inisialisasi state
  const [isLight, setIsLight] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("light");
  });

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const userName = localStorage.getItem("userName") || "Ahmad Rizki";
  const userRole = localStorage.getItem("userRole") || "Sales Manager";

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        {/* BARIS ATAS: Banking Portal + Theme Toggle */}
        <div className="sidebar-title-row">
          <h3>Banking Portal</h3>

          <button
            type="button"
            onClick={handleToggleTheme}
            className="theme-toggle-btn"
          >
            <i className={isLight ? "fas fa-sun" : "fas fa-moon"} />
          </button>
        </div>

        {/* MENU */}
        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}
          >
            <i className="fas fa-home" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/leads"
            className={`nav-item ${isActive("/leads") ? "active" : ""}`}
          >
            <i className="fas fa-users" />
            <span>Daftar Lead</span>
            <span className="badge">{sidebarCounts.leadsTotal}</span>
          </Link>

          <Link
            to="/priority"
            className={`nav-item ${isActive("/priority") ? "active" : ""}`}
          >
            <i className="fas fa-star" />
            <span>Prioritas Tinggi</span>
            <span className="badge badge-danger">
              {sidebarCounts.highPriority}
            </span>
          </Link>

          <Link
            to="/follow-up"
            className={`nav-item ${isActive("/follow-up") ? "active" : ""}`}
          >
            <i className="fas fa-phone-alt" />
            <span>Follow Up</span>
          </Link>

          <Link
            to="/analytics"
            className={`nav-item ${isActive("/analytics") ? "active" : ""}`}
          >
            <i className="fas fa-chart-bar" />
            <span>Analytics</span>
          </Link>

          <Link
            to="/history"
            className={`nav-item ${isActive("/history") ? "active" : ""}`}
          >
            <i className="fas fa-history" />
            <span>Riwayat</span>
          </Link>
        </nav>

        {/* FOOTER SIDEBAR */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <i className="fas fa-user" />
            </div>
            <div className="user-info">
              <h4>{userName}</h4>
              <p>{userRole}</p>
            </div>
          </div>

          <button type="button" className="btn-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
