import React from "react";

const getActivityIconClass = (type) => {
  if (type === "success") return "fas fa-check";
  if (type === "warning") return "fas fa-phone";
  return "fas fa-user-plus";
};

const LeadActivityPanel = ({ activities, notes }) => {
  return (
    <section className="lead-activity-section">
      {/* Aktivitas Terakhir */}
      <div className="activity-card">
        <div className="card-header">
          <h3>Aktivitas Terakhir</h3>
        </div>

        {activities.map((act) => (
          <div key={act.id} className="activity-item">
            <div className={`activity-icon ${act.type}`}>
              <i className={getActivityIconClass(act.type)} />
            </div>

            <div className="activity-details">
              <strong>{act.title}</strong>
              <p>{act.description}</p>
              <span>
                {act.time} • {act.channel} • {act.status}
              </span>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <p style={{ fontSize: "0.85rem", marginTop: "0.4rem" }}>
            Belum ada aktivitas tercatat.
          </p>
        )}
      </div>

      {/* Catatan Internal */}
      <div className="chart-card">
        <div className="card-header">
          <h3>Catatan Internal</h3>
        </div>
        <p>{notes || "Belum ada catatan."}</p>
      </div>
    </section>
  );
};

export default LeadActivityPanel;
