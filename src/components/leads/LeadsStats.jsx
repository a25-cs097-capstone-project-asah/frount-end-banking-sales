import React from "react";

const LeadsStats = ({
  totalLeads,
  highPriorityLeads,
  avgScore,
  followUpToday,
}) => {
  return (
    <div className="stats-card-dark">
      <div className="stat-item-dark">
        <span className="stat-label-dark">Total Lead</span>
        <span className="stat-value-dark">{totalLeads}</span>
      </div>
      <div className="stat-item-dark">
        <span className="stat-label-dark">Prioritas Tinggi</span>
        <span className="stat-value-dark">{highPriorityLeads}</span>
      </div>
      <div className="stat-item-dark">
        <span className="stat-label-dark">Rata-rata Skor</span>
        <span className="stat-value-dark">{avgScore}%</span>
      </div>
      <div className="stat-item-dark">
        <span className="stat-label-dark">Follow Up Hari Ini</span>
        <span className="stat-value-dark">{followUpToday}</span>
      </div>
    </div>
  );
};

export default LeadsStats;
