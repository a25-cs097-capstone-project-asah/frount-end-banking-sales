import React from "react";

const InteractionTimeline = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="interaction-timeline glass-card">
        <h3>Riwayat Interaksi</h3>
        <p>Belum ada riwayat.</p>
      </div>
    );
  }

  /* ================== FORMATTERS ================== */
  const formatDate = (iso) =>
    new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const formatDateHeader = (isoDate) =>
    new Date(isoDate).toLocaleDateString("id-ID", {
      dateStyle: "full",
    });

  /* ================== ICON ================== */
  const getIcon = (action) => {
    switch (action) {
      case "ADD_NOTE":
        return "fas fa-plus";
      case "EDIT_NOTE":
        return "fas fa-edit";
      case "DELETE_NOTE":
        return "fas fa-trash";
      case "UPDATE_STATUS":
        return "fas fa-sync";
      case "EMAIL_SENT":
        return "fas fa-envelope";
      default:
        return "fas fa-info-circle";
    }
  };

  /* ================== BADGE COLORS ================== */
  const badgeColor = {
    ADD_NOTE: "linear-gradient(90deg,#4ade80,#22c55e)",
    EDIT_NOTE: "linear-gradient(90deg,#60a5fa,#3b82f6)",
    DELETE_NOTE: "linear-gradient(90deg,#f87171,#ef4444)",
    UPDATE_STATUS: "linear-gradient(90deg,#ea4335,#1a73e8)",
    EMAIL_SENT: "linear-gradient(90deg,#a855f7,#9333ea)",
  };

  /* ================== GROUP BY DATE ================== */
  const grouped = history.reduce((acc, item) => {
    const iso = item.createdAt.split("T")[0];
    if (!acc[iso]) acc[iso] = [];
    acc[iso].push(item);
    return acc;
  }, {});

  return (
    <div className="interaction-timeline">
      <h3>Riwayat Interaksi</h3>

      {Object.keys(grouped)
        .sort((a, b) => new Date(b) - new Date(a))
        .map((isoDate) => (
          <div key={isoDate} className="date-group">
            {/* DATE HEADER */}
            <div className="date-header">
              <i className="fas fa-calendar-day"></i>
              <span>{formatDateHeader(isoDate)}</span>
            </div>

            <div className="timeline">
              {grouped[isoDate]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
                  <div className="timeline-item" key={item.id}>
                    {/* DOT */}
                    <div className="timeline-dot">
                      <i className={getIcon(item.action)} />
                    </div>

                    {/* CARD */}
                    <div className="timeline-card glass-card">
                      <div className="timeline-top">
                        <strong>{item.leadName}</strong>
                        <span
                          className="badge"
                          style={{ background: badgeColor[item.action] }}
                        >
                          {item.action.replace("_", " ")}
                        </span>
                      </div>

                      <p className="details">{item.details}</p>

                      <div className="timeline-footer">
                        <i className="far fa-clock"></i>
                        {formatDate(item.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default InteractionTimeline;
