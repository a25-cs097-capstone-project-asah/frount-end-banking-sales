import React from "react";

const LeadSummary = ({ name, job, email, phone, score, scoreClass }) => {
  const initials = (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section className="lead-summary-card">
      <div className="lead-summary-main">
        <div className="lead-summary-left">
          <div className="lead-avatar large">
            <span>{initials}</span>
          </div>

          <div className="lead-summary-info">
            <h2>{name}</h2>

            <p className="lead-summary-title">
              <i className="fas fa-briefcase" /> {job}
            </p>

            <p>
              <i className="fas fa-envelope" /> {email}
            </p>
            <p>
              <i className="fas fa-phone" /> {phone}
            </p>
          </div>
        </div>

        <div className="lead-summary-score">
          <div className={`score-circle summary-score ${scoreClass}`}>
            <span>{score}%</span>
          </div>
          <div className="summary-score-text">
            <p className="summary-score-level">Prioritas Tinggi</p>
            <p className="summary-score-sub">Segera follow up</p>
          </div>
        </div>
      </div>

      {/* Tombol aksi singkat */}
      <div className="lead-summary-actions">
        <button className="summary-action-card">
          <div className="summary-action-icon">
            <i className="fas fa-phone" />
          </div>
          Telepon
        </button>

        <button className="summary-action-card">
          <div className="summary-action-icon">
            <i className="fas fa-envelope" />
          </div>
          Email
        </button>

        <button className="summary-action-card">
          <div className="summary-action-icon">
            <i className="fas fa-calendar" />
          </div>
          Jadwalkan
        </button>

        <button className="summary-action-card">
          <div className="summary-action-icon">
            <i className="fas fa-sticky-note" />
          </div>
          Catatan
        </button>
      </div>
    </section>
  );
};

export default LeadSummary;
