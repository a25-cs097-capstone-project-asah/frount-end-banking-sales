import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PriorityLeads = ({ priorityLeads }) => {
  const navigate = useNavigate();

  const callLead = (name) => {
    console.log("Call lead:", name);
  };

  /* ============================
     NORMALISASI SCORE / KATEGORI
  =============================== */

  // score class untuk warna border / circle
  const getScoreClass = (score) => {
    if (score >= 80) return "high";
    if (score >= 60) return "medium";
    return "low";
  };

  // label kategori berdasarkan teks dari backend
  const getCategoryLabel = (category, score) => {
    if (!category) {
      // fallback dari score
      if (score >= 80) return "Tinggi";
      if (score >= 60) return "Sedang";
      return "Rendah";
    }

    // normalisasi "High", "high", "TINGGI", "Tinggi", dll
    const c = category.toString().toLowerCase();

    if (c === "tinggi" || c === "high") return "Tinggi";
    if (c === "sedang" || c === "medium") return "Sedang";
    if (c === "rendah" || c === "low") return "Rendah";

    return "Tidak Diketahui";
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
          const categoryLabel = getCategoryLabel(lead.category, score);

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
                <span className="score-label">{categoryLabel}</span>
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
