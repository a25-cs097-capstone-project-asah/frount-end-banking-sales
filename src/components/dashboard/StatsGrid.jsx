import React from "react";

const StatsGrid = ({ stats }) => {
  return (
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
            <i className="fas fa-arrow-up" /> {stats.conversion.change}% dari
            bulan lalu
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
  );
};

export default StatsGrid;
