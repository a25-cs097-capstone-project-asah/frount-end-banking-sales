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
        const score = lead.probabilityScore || 0;
        const scoreCat = getScoreCategory(score);

        const initials =
          (lead.name || "")
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase() || "?";

        return (
          <div
            key={lead._id}
            className="lead-card-dark"
            onClick={() => onCardClick(lead)}
          >
            <div className="lead-card-header">
              <div className="lead-card-avatar">{initials}</div>
              <div className="lead-card-title">
                <h3>{lead.name}</h3>
                <p>
                  {lead.job || "-"} {lead.age ? `• ${lead.age} tahun` : ""}
                </p>
              </div>
            </div>

            <div className="lead-card-body">
              <div className="lead-card-score">
                <div className={`score-circle ${scoreCat}`}>
                  <span>{score}%</span>
                </div>
                <div className="lead-card-score-text">
                  <span className="status-pill">
                    {formatStatusLabel(lead.status)}
                  </span>
                  <span className="last-contact">
                    Terakhir:{" "}
                    {lead.lastContactedAt
                      ? new Date(lead.lastContactedAt).toLocaleDateString(
                          "id-ID"
                        )
                      : "-"}
                  </span>
                </div>
              </div>

              <div className="lead-card-actions">
                <button
                  className="btn-icon-small"
                  title="Hubungi"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCallLead?.(lead);
                  }}
                >
                  <i className="fas fa-phone" />
                </button>

                <button
                  className="btn-icon-small"
                  title="Email"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEmailLead?.(lead);
                  }}
                >
                  <i className="fas fa-envelope" />
                </button>

                <button
                  className="btn-icon-small"
                  title="Catatan"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddNote?.(lead);
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
