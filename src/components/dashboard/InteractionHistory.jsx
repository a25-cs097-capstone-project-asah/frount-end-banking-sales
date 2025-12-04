import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { useNavigate } from "react-router-dom";

const InteractionHistory = ({ leadId }) => {
  const navigate = useNavigate();

  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLight = document.documentElement.classList.contains("light");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/histories?leadId=${leadId}`);
        const all = res.data.data.histories || [];

        const sorted = all.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setHistories(sorted);
      } catch {
        setError("Gagal mengambil riwayat interaksi.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [leadId]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getIcon = (action) => {
    switch (action) {
      case "ADD_NOTE":
        return "fas fa-plus";
      case "EDIT_NOTE":
        return "fas fa-edit";
      case "DELETE_NOTE":
        return "fas fa-trash";
      case "EMAIL_SENT":
        return "fas fa-envelope";
      case "CALL":
        return "fas fa-phone";
      case "UPDATE_STATUS":
        return "fas fa-sync";
      default:
        return "fas fa-info-circle";
    }
  };

  const badgeColor = {
    ADD_NOTE: "linear-gradient(90deg,#4ade80,#22c55e)",
    EDIT_NOTE: "linear-gradient(90deg,#60a5fa,#3b82f6)",
    DELETE_NOTE: "linear-gradient(90deg,#f87171,#ef4444)",
    UPDATE_STATUS: "linear-gradient(90deg,#ea4335,#1a73e8)",
    EMAIL_SENT: "linear-gradient(90deg,#a855f7,#9333ea)",
  };

  const latestThree = histories.slice(0, 4);

  return (
    <div className={`interaction-card ${isLight ? "light-card" : "dark-card"}`}>
      {/* HEADER */}
      <div className="history-header-bar">
        <h2 className="section-title">Riwayat Interaksi</h2>

        <button
          className={`see-all-btn ${isLight ? "see-all-light" : ""}`}
          onClick={() => navigate("/riwayat")}
        >
          Lihat Semua
        </button>
      </div>

      {loading && <p>Sedang memuat...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="timeline">
        {latestThree.map((item) => (
          <div className="timeline-item" key={item.id}>
            <div className="timeline-dot">
              <i className={getIcon(item.action)}></i>
            </div>

            <div
              className={`timeline-card glass-card ${
                isLight ? "glass-card-light" : ""
              }`}
            >
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

        {!loading && latestThree.length === 0 && (
          <p style={{ opacity: 0.6 }}>Belum ada riwayat interaksi.</p>
        )}
      </div>
    </div>
  );
};

export default InteractionHistory;
