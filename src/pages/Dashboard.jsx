import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

import {
  stats,
  conversionTrend,
  scoreDistribution,
  priorityLeads,
  activities,
} from "../data/dashboardMock";

const Dashboard = () => {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  const conversionChartRef = useRef(null);
  const scoreDistributionChartRef = useRef(null);
  const conversionChartInstance = useRef(null);
  const scoreChartInstance = useRef(null);

  // Inisialisasi Chart.js (menyesuaikan light / dark)
  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    const axisColor = isLight ? "#0A1931" : "#e5e7eb";
    const gridColor = isLight
      ? "rgba(148, 163, 184, 0.4)"
      : "rgba(148, 163, 184, 0.25)";
    const legendColor = axisColor;

    // LINE CHART: Trend Konversi
    if (conversionChartRef.current) {
      if (conversionChartInstance.current) {
        conversionChartInstance.current.destroy();
      }
      conversionChartInstance.current = new Chart(conversionChartRef.current, {
        type: "line",
        data: {
          labels: conversionTrend.labels,
          datasets: [
            {
              label: "Konversi",
              data: conversionTrend.datasets,
              borderColor: "rgba(0, 181, 204, 1)",
              backgroundColor: "rgba(0, 181, 204, 0.15)",
              tension: 0.35,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: axisColor },
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: axisColor },
            },
          },
        },
      });
    }

    // DOUGHNUT CHART: Distribusi Lead Score
    if (scoreDistributionChartRef.current) {
      if (scoreChartInstance.current) {
        scoreChartInstance.current.destroy();
      }
      scoreChartInstance.current = new Chart(
        scoreDistributionChartRef.current,
        {
          type: "doughnut",
          data: {
            labels: scoreDistribution.labels,
            datasets: [
              {
                data: scoreDistribution.values,
                backgroundColor: [
                  "rgba(34,197,94,0.9)", // Tinggi
                  "rgba(234,179,8,0.9)", // Sedang
                  "rgba(239,68,68,0.9)", // Rendah
                ],
                borderColor: "#0f172a",
                borderWidth: 2,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: legendColor, // penting buat light mode
                  boxWidth: 12,
                },
              },
            },
          },
        }
      );
    }

    // cleanup
    return () => {
      if (conversionChartInstance.current) {
        conversionChartInstance.current.destroy();
      }
      if (scoreChartInstance.current) {
        scoreChartInstance.current.destroy();
      }
    };
  }, []); // dijalankan saat pertama load

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const callLead = (name) => {
    console.log("Call lead:", name);
  };

  const goToLeadDetail = (id) => {
    navigate(`/leads/${id}`);
  };

  return (
    <>
      {/* HEADER ATAS */}
      <header className="top-header">
        <div className="header-left">
          <h1>Dashboard</h1>
        </div>

        <div className="header-right">
          <div className="search-box">
            <i className="fas fa-search" />
            <input type="text" placeholder="Cari nasabah..." />
          </div>

          <button
            className="header-icon"
            type="button"
            onClick={toggleNotifications}
          >
            <i className="fas fa-bell" />
            <span className="notification-badge">5</span>
          </button>

          <div
            className={`notifications-dropdown ${
              showNotifications ? "open" : ""
            }`}
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

          <button className="header-icon" type="button">
            <i className="fas fa-question-circle" />
          </button>
        </div>
      </header>

      {/* KONTEN DASHBOARD */}
      <div className="dashboard-content">
        {/* Kartu Statistik */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <i className="fas fa-users" />
            </div>
            <div className="stat-details">
              <h3>Total Lead</h3>
              <p className="stat-number">
                {stats.totalLead.value.toLocaleString()}
              </p>
              <span className="stat-change positive">
                <i className="fas fa-arrow-up" /> {stats.totalLead.change}% dari
                bulan lalu
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <i className="fas fa-check-circle" />
            </div>
            <div className="stat-details">
              <h3>Konversi</h3>
              <p className="stat-number">
                {stats.conversion.value.toLocaleString()}
              </p>
              <span className="stat-change positive">
                <i className="fas fa-arrow-up" /> {stats.conversion.change}%
                dari bulan lalu
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <i className="fas fa-star" />
            </div>
            <div className="stat-details">
              <h3>Prioritas Tinggi</h3>
              <p className="stat-number">{stats.highPriority.value}</p>
              <span className="stat-change">
                <i className="fas fa-minus" /> Stabil
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <i className="fas fa-percentage" />
            </div>
            <div className="stat-details">
              <h3>Conversion Rate</h3>
              <p className="stat-number">{stats.conversionRate.value}%</p>
              <span className="stat-change positive">
                <i className="fas fa-arrow-up" /> {stats.conversionRate.change}%
                dari bulan lalu
              </span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-row">
          <div className="chart-card">
            <div className="card-header">
              <h3>Trend Konversi</h3>
              <select className="select-period">
                <option>7 Hari Terakhir</option>
                <option>30 Hari Terakhir</option>
                <option>3 Bulan Terakhir</option>
              </select>
            </div>
            <canvas ref={conversionChartRef} />
          </div>

          <div className="chart-card">
            <div className="card-header">
              <h3>Distribusi Lead Score</h3>
              <button className="btn-icon" type="button">
                <i className="fas fa-ellipsis-v" />
              </button>
            </div>
            <canvas ref={scoreDistributionChartRef} />
          </div>
        </div>

        {/* Lead Prioritas & Aktivitas */}
        <div className="bottom-section">
          <div className="priority-leads-card">
            <div className="card-header">
              <h3>Lead Prioritas Tinggi</h3>
              <Link to="/leads" className="btn-text">
                Lihat Semua
              </Link>
            </div>

            <div className="leads-list">
              {priorityLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="lead-item"
                  onClick={() => goToLeadDetail(lead.id)}
                >
                  <div className="lead-avatar">
                    <i className="fas fa-user" />
                  </div>
                  <div className="lead-info">
                    <h4>{lead.name}</h4>
                    <p>
                      {lead.title} • {lead.age} tahun
                    </p>
                  </div>
                  <div className="lead-score">
                    <div
                      className={`score-circle ${
                        lead.score >= 85 ? "high" : "medium"
                      }`}
                    >
                      <span>{lead.score}%</span>
                    </div>
                    <span className="score-label">{lead.level}</span>
                  </div>
                  <button
                    className="btn-action"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      callLead(lead.name);
                    }}
                  >
                    <i className="fas fa-phone" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-card">
            <div className="card-header">
              <h3>Aktivitas Terkini</h3>
              <button className="btn-icon" type="button">
                <i className="fas fa-ellipsis-v" />
              </button>
            </div>

            <div className="activity-list">
              {activities.map((item) => (
                <div key={item.id} className="activity-item">
                  <div className={`activity-icon ${item.type}`}>
                    <i
                      className={
                        item.type === "success"
                          ? "fas fa-check"
                          : item.type === "warning"
                            ? "fas fa-phone"
                            : "fas fa-user-plus"
                      }
                    />
                  </div>
                  <div className="activity-details">
                    <p>
                      <strong>{item.title}</strong>
                    </p>
                    <p>{item.desc}</p>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
