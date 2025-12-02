import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/client";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // angka di badge sidebar, diisi dari backend
  const [sidebarCounts, setSidebarCounts] = useState({
    leadsTotal: 0,
    highPriority: 0,
  });

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  // ====== AMBIL DATA DARI BACKEND: /dashboard/stats ======
  useEffect(() => {
    const fetchSidebarCounts = async () => {
      try {
        const res = await api.get("/dashboard/stats");

        // hanya ambil field yang diperlukan
        const stats = res.data?.data?.stats || {};

        setSidebarCounts({
          leadsTotal: stats.totalLeads ?? 0,
          highPriority: stats.highPriorityLeads ?? 0,
          // jika ingin dipakai nanti:
          averageScore: stats.averageScore ?? 0,
          followUpLeads: stats.followUpLeads ?? 0,
        });
      } catch (err) {
        console.error("Gagal mengambil statistik sidebar:", err);
      }
    };

    fetchSidebarCounts();
  }, []);

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-title-row">
          <div className="sidebar-brand">
            <div className="brand-badge">
              <i className="fas fa-chart-line" />
            </div>
            <div className="brand-text">
              <div className="brand-title">Banking Portal</div>
              <div className="brand-subtitle">Predictive Lead Scoring</div>
            </div>
          </div>
        </div>

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
