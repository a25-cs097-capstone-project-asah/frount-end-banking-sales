import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PriorityLeads = ({ priorityLeads }) => {
  const navigate = useNavigate();

  const callLead = (name) => {
    console.log("Call lead:", name);
  };

  const getScoreClass = (score) => {
    if (score >= 85) return "high";
    if (score >= 70) return "medium";
    return "low";
  };

  const getLevelLabel = (category) => {
    switch (category) {
      case "high":
        return "Tinggi";
      case "medium":
        return "Sedang";
      case "low":
        return "Rendah";
      default:
        return "Tidak Diketahui";
    }
  };

  return (
    <div className="priority-leads-card">
      <div className="card-header">
        <h3>Lead Prioritas Tinggi</h3>
        <Link to="/leads" className="btn-text">
          Lihat Semua
        </Link>
      </div>

      <div className="leads-list">
        {priorityLeads.map((lead) => {
          const score = lead.probabilityScore || 0;
          const scoreClass = getScoreClass(score);
          const levelLabel = getLevelLabel(lead.category);

          return (
            <div
              key={lead.id}
              className="lead-item"
              onClick={() => navigate(`/leads/${lead.id}`)}
            >
              {/* Avatar */}
              <div className="lead-avatar">
                <i className="fas fa-user" />
              </div>

              {/* Info */}
              <div className="lead-info">
                <h4>{lead.name}</h4>
                <p>{lead.age ? `${lead.age} tahun` : "Usia tidak tersedia"}</p>
              </div>

              {/* Score column */}
              <div className="lead-score">
                <div className={`score-circle ${scoreClass}`}>
                  <span>{score}%</span>
                </div>
                <span className="score-label">{levelLabel}</span>
              </div>

              {/* Call button */}
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
          );
        })}
      </div>
    </div>
  );
};

export default PriorityLeads;
