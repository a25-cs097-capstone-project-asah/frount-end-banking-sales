import React, { useState, useEffect } from "react";
import { toggleTheme } from "../theme";
import { api } from "../api/client";

const History = () => {
  const [isLight, setIsLight] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("light");
  });

  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  /* ================== FETCH GLOBAL HISTORIES ================== */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/histories`);
        setHistories(res.data.data.histories || []);
      } catch {
        setError("Gagal mengambil riwayat.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  /* ================== FORMATTERS ================== */
  const formatDate = (iso) =>
    new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // Format header tanggal (ISO)
  const formatDateHeader = (isoDate) =>
    new Date(isoDate).toLocaleDateString("id-ID", {
      dateStyle: "full",
    });

  // Ikon tiap aksi
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
      default:
        return "fas fa-info-circle";
    }
  };

  // Warna badge
  const badgeColor = {
    ADD_NOTE: "linear-gradient(90deg,#4ade80,#22c55e)",
    EDIT_NOTE: "linear-gradient(90deg,#60a5fa,#3b82f6)",
    DELETE_NOTE: "linear-gradient(90deg,#f87171,#ef4444)",
    UPDATE_STATUS: "linear-gradient(90deg,#facc15,#eab308)",
  };

  /* ================== GROUP BY DATE (ISO) ================== */
  const grouped = histories.reduce((acc, item) => {
    const isoDate = item.createdAt.split("T")[0]; // “2025-11-28”
    if (!acc[isoDate]) acc[isoDate] = [];
    acc[isoDate].push(item);
    return acc;
  }, {});

  return (
    <>
      {/* HEADER */}
      <div className="top-header">
        <h1>Riwayat</h1>
        <button className="header-icon" onClick={handleToggleTheme}>
          <i className={isLight ? "fas fa-sun" : "fas fa-moon"} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="history-container">
        {loading && <p>Sedang memuat...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading &&
          Object.keys(grouped)
            .sort((a, b) => new Date(b) - new Date(a))
            .map((isoDate) => (
              <div key={isoDate} className="date-group">
                {/* DATE HEADER */}
                <div className="date-header">
                  <i className="fas fa-calendar-day"></i>
                  <span>{formatDateHeader(isoDate)}</span>
                </div>

                {/* TIMELINE */}
                <div className="timeline">
                  {grouped[isoDate]
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
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
    </>
  );
};

export default History;
