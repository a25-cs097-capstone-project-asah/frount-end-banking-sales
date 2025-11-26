import React, { useEffect, useState } from "react";
import { toggleTheme } from "../theme";
import { getDashboardStats, getDashboardCharts } from "../api/dashboard";

const Analytics = () => {
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );

  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState([]);
  const [distribution, setDistribution] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const statsData = await getDashboardStats();
        const chartsData = await getDashboardCharts(7);

        setStats(statsData);
        setTrend(chartsData.convertionTrend || []);
        setDistribution(chartsData.distributionStats || []);
      } catch (err) {
        console.error(err);
        setErrorMsg("Gagal memuat data analytics.");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  // ================= STYLES FOR MINI CHARTS ==================
  const barStyle = {
    height: "12px",
    borderRadius: "6px",
    background: "var(--accent-blue)",
  };

  const categoryColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e",
  };

  // ============================================================

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

      <div className="leads-content">
        {loading ? (
          <p>Memuat analytics...</p>
        ) : errorMsg ? (
          <p style={{ color: "#ef4444" }}>{errorMsg}</p>
        ) : (
          <>
            {/* ================== SUMMARY CARDS ================== */}
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Total Leads</h3>
                <p className="big-number">{stats?.totalLeads}</p>
              </div>

              <div className="analytics-card">
                <h3>Total High Priority</h3>
                <p className="big-number">{stats?.totalHigh}</p>
              </div>

              <div className="analytics-card">
                <h3>Rata-rata Skor</h3>
                <p className="big-number">{stats?.avgScore}</p>
              </div>

              <div className="analytics-card">
                <h3>Conversion Rate</h3>
                <p className="big-number">{stats?.conversionRate}%</p>
              </div>
            </div>

            {/* ================== TREND 7 HARI ================== */}
            <div className="chart-card" style={{ marginTop: "30px" }}>
              <h3>Tren Konversi 7 Hari</h3>
              <div className="trend-chart">
                {trend.map((item, i) => (
                  <div key={i} className="trend-bar">
                    <div
                      style={{
                        ...barStyle,
                        width: `${item.value}%`,
                      }}
                    ></div>
                    <span className="trend-label">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ================== DISTRIBUSI SKOR ================== */}
            <div className="chart-card" style={{ marginTop: "30px" }}>
              <h3>Distribusi Skor (Low / Medium / High)</h3>

              <div className="distribution-bars">
                {distribution.map((item, i) => (
                  <div key={i} className="distribution-row">
                    <span className="cat-label">{item.category}</span>

                    <div
                      className="cat-bar"
                      style={{
                        width: `${item.percentage}%`,
                        background: categoryColors[item.category] || "#3b82f6",
                      }}
                    ></div>

                    <span className="cat-value">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* INLINE STYLE FOR ANALYTICS PAGE */}
      <style>{`
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .analytics-card {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 14px;
          box-shadow: var(--card-shadow);
        }

        .analytics-card .big-number {
          font-size: 32px;
          font-weight: 600;
          margin-top: 10px;
        }

        .trend-chart {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .trend-bar {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .trend-label {
          font-size: 12px;
          opacity: 0.75;
        }

        .distribution-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .cat-label {
          width: 70px;
          text-transform: capitalize;
        }

        .cat-bar {
          height: 14px;
          border-radius: 6px;
          flex-grow: 1;
        }

        .cat-value {
          width: 50px;
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default Analytics;
