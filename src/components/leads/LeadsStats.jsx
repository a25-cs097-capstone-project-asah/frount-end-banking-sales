// src/components/leads/LeadsStats.jsx
import React from "react";

const LeadsStats = ({
  totalLeads,
  highPriorityLeads,
  avgScore,
  followUpToday,
}) => {
  // jaga-jaga kalau avgScore bukan angka (NaN / undefined)
  const safeAvgScore = Number.isFinite(Number(avgScore)) ? Number(avgScore) : 0;

  return (
    <div className="stats-card-dark">
      <div className="stat-item-dark">
        <span className="stat-label-dark">Total Lead</span>
        <span className="stat-value-dark">{totalLeads ?? 0}</span>
      </div>

      <div className="stat-item-dark">
        <span className="stat-label-dark">Prioritas Tinggi</span>
        <span className="stat-value-dark">{highPriorityLeads ?? 0}</span>
      </div>

      <div className="stat-item-dark">
        <span className="stat-label-dark">Rata-rata Skor</span>
        <span className="stat-value-dark">{safeAvgScore}%</span>
      </div>

      <div className="stat-item-dark">
        <span className="stat-label-dark">Follow Up Hari Ini</span>
        <span className="stat-value-dark">{followUpToday ?? 0}</span>
      </div>
    </div>
  );
};

export default LeadsStats;
