import React from "react";

const StatsGrid = ({ stats }) => {
  if (!stats) return null;

  const {
    totalLeads = 0,
    convertedLeads = 0,
    highPriorityLeads = 0,
    conversionRate = 0,
    averageScore = 0,
  } = stats;

  const formatNumber = (n) => Number(n || 0).toLocaleString("id-ID");

  return (
    <div className="stats-grid">
      {/* Total Lead */}
      <div className="stat-card">
        <div className="stat-icon blue">
          <i className="fas fa-users" />
        </div>
        <div className="stat-details">
          <h3>Total Lead</h3>
          <p className="stat-number">{formatNumber(totalLeads)}</p>
          <span className="stat-change positive">
            <i className="fas fa-arrow-up" /> Data keseluruhan leads
          </span>
        </div>
      </div>

      {/* Konversi */}
      <div className="stat-card">
        <div className="stat-icon green">
          <i className="fas fa-check-circle" />
        </div>
        <div className="stat-details">
          <h3>Konversi</h3>
          <p className="stat-number">{formatNumber(convertedLeads)}</p>
          <span className="stat-change positive">
            <i className="fas fa-arrow-up" /> Total lead yang berhasil
            dikonversi
          </span>
        </div>
      </div>

      {/* Prioritas Tinggi */}
      <div className="stat-card">
        <div className="stat-icon orange">
          <i className="fas fa-star" />
        </div>
        <div className="stat-details">
          <h3>Prioritas Tinggi</h3>
          <p className="stat-number">{formatNumber(highPriorityLeads)}</p>
          <span className="stat-change">
            <i className="fas fa-minus" /> Lead kategori high
          </span>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="stat-card">
        <div className="stat-icon purple">
          <i className="fas fa-percentage" />
        </div>
        <div className="stat-details">
          <h3>Conversion Rate</h3>

          <p className="stat-number">
            {(Number(conversionRate) * 100).toFixed(2)}%
          </p>

          <span className="stat-change positive">
            <i className="fas fa-chart-line" /> Rata-rata skor:{" "}
            <strong>{Number(averageScore || 0).toFixed(2)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
