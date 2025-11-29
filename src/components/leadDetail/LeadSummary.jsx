import React from "react";

const LeadSummary = ({
  name,
  score,
  scoreClass,
  status,
  onStatusChange,

  // HANYA INI YANG DIPAKAI
  onOpenNotesSection,
}) => {
  const initials = (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("");

  const getScoreLabel = () => {
    if (score >= 80) return "Tinggi";
    if (score >= 60) return "Sedang";
    return "Rendah";
  };

  const getScoreDescription = () => {
    if (score >= 80) return "Prioritas tinggi untuk dihubungi";
    if (score >= 60) return "Perlu dipertimbangkan lebih lanjut";
    return "Prioritas rendah";
  };

  const statusList = [
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "follow-up", label: "Follow Up" },
    { value: "converted", label: "Converted" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <section className="lead-summary-card">
      <div className="lead-summary-main">
        {/* Bagian kiri */}
        <div className="lead-summary-left">
          <div className="lead-avatar large">
            <span>{initials}</span>
          </div>

          <div className="lead-summary-info">
            <h2>{name}</h2>

            <div className="detail-status-wrapper">
              <label>Status:</label>
              <select
                className="detail-status-dropdown"
                value={status}
                onChange={onStatusChange}
              >
                {statusList.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="lead-summary-score">
          <div className={`score-circle summary-score ${scoreClass}`}>
            <span>{score}%</span>
          </div>

          <div className="summary-score-text">
            <p className="summary-score-level">{getScoreLabel()}</p>
            <p className="summary-score-sub">{getScoreDescription()}</p>
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
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

        {/* SCROLL KE CATATAN */}
        <button className="summary-action-card" onClick={onOpenNotesSection}>
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
