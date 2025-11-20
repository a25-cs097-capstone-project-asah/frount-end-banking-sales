import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PriorityLeads = ({ priorityLeads }) => {
  const navigate = useNavigate();

  const callLead = (name) => {
    console.log("Call lead:", name);
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
          const scoreClass =
            lead.score >= 85 ? "high" : lead.score >= 70 ? "medium" : "low";

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
                <p>
                  {lead.title} • {lead.age} tahun
                </p>
              </div>

              {/* Score column */}
              <div className="lead-score">
                <div className={`score-circle ${scoreClass}`}>
                  <span>{lead.score}%</span>
                </div>
                <span className="score-label">{lead.level}</span>
              </div>

              {/* Call button */}
              <button
                className="btn-action"
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // ⛔ jangan buka halaman detail
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
