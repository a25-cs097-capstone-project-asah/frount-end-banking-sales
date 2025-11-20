import React from "react";

const ActivityList = ({ activities }) => {
  return (
    <div className="activity-card">
      <div className="card-header">
        <h3>Aktivitas Terkini</h3>
        <button className="btn-icon" type="button">
          <i className="fas fa-ellipsis-v" />
        </button>
      </div>

      <div className="activity-list">
        {activities.map((item) => (
          <div key={item.id} className="activity-item">
            <div className={`activity-icon ${item.type}`}>
              <i
                className={
                  item.type === "success"
                    ? "fas fa-check"
                    : item.type === "warning"
                      ? "fas fa-phone"
                      : "fas fa-user-plus"
                }
              />
            </div>
            <div className="activity-details">
              <p>
                <strong>{item.title}</strong>
              </p>
              <p>{item.desc}</p>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
