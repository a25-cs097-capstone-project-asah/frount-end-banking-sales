import React, { useState } from "react";

const LeadSummary = ({
  name,
  score,
  scoreClass,
  status,
  onStatusChange,
  onEmail,
  onOpenNotesSection,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

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

  const handleSelect = (val) => {
    onStatusChange({ target: { value: val } });
    setOpenMenu(false);
  };

  return (
    <section className="lead-summary-card">
      <div className="lead-summary-main">
        <div className="lead-summary-left">
          <div className="lead-avatar large">
            <span>{initials}</span>
          </div>

          <div className="lead-summary-info">
            <h2>{name}</h2>

            {/* MODERN STATUS DROPDOWN */}
            <div className="detail-status-wrapper">
              <label>Status:</label>

              <div
                className={`status-select status-${status}`}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <button className="status-select-trigger">
                  <span className="status-dot" />
                  {statusList.find((s) => s.value === status)?.label}
                  <i className="fas fa-chevron-down"></i>
                </button>

                {openMenu && (
                  <div className="status-select-menu">
                    {statusList.map((s) => (
                      <div
                        key={s.value}
                        className={`status-select-option status-${s.value}`}
                        onClick={() => handleSelect(s.value)}
                      >
                        <span className="status-dot" />
                        {s.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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

      {/* ACTION BUTTONS */}
      <div className="lead-summary-actions">
        <button className="summary-action-card" onClick={onEmail}>
          <div className="summary-action-icon">
            <i className="fas fa-envelope" />
          </div>
          Email
        </button>

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
