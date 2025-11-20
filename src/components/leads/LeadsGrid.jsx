import React from "react";

const LeadsGrid = ({
  leads,
  getScoreCategory,
  formatStatusLabel,
  onCardClick,
  onCallLead,
  onEmailLead,
  onAddNote,
}) => {
  return (
    <div className="leads-grid">
      {leads.map((lead) => {
        const scoreCat = getScoreCategory(lead.score);

        return (
          <div
            key={lead.id}
            className="lead-card-dark"
            onClick={() => onCardClick(lead.id)}
          >
            <div className="lead-card-header">
              <div className="lead-card-avatar">
                {(lead.name || "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="lead-card-title">
                <h3>{lead.name}</h3>
                <p>
                  {lead.job || lead.title} • {lead.age} tahun
                </p>
              </div>
            </div>

            <div className="lead-card-body">
              <div className="lead-card-score">
                <div className={`score-circle ${scoreCat}`}>
                  <span>{lead.score}%</span>
                </div>
                <div className="lead-card-score-text">
                  <span className="status-pill">
                    {formatStatusLabel(lead.status)}
                  </span>
                  <span className="last-contact">
                    Terakhir: {lead.lastContact || "-"}
                  </span>
                </div>
              </div>

              <div className="lead-card-actions">
                <button
                  type="button"
                  className="btn-icon-small"
                  title="Hubungi"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCallLead(lead);
                  }}
                >
                  <i className="fas fa-phone" />
                </button>
                <button
                  type="button"
                  className="btn-icon-small"
                  title="Email"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEmailLead(lead);
                  }}
                >
                  <i className="fas fa-envelope" />
                </button>
                <button
                  type="button"
                  className="btn-icon-small"
                  title="Catatan"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddNote(lead);
                  }}
                >
                  <i className="fas fa-sticky-note" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {leads.length === 0 && (
        <p style={{ marginTop: "0.8rem" }}>
          Tidak ada data lead yang cocok dengan filter.
        </p>
      )}
    </div>
  );
};

export default LeadsGrid;
