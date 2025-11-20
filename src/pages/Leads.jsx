import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { leadsData as mockLeads } from "../data/leadsMock";

const Leads = () => {
  const navigate = useNavigate();

  // ===================== STATE DATA & FILTER =====================
  const [leads, setLeads] = useState(mockLeads);

  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const [view, setView] = useState("table");

  // ===================== UTIL =====================

  const formatStatusLabel = (status) => status || "-";

  const getScoreCategory = (score) => {
    if (score >= 85) return "high";
    if (score >= 70) return "medium";
    return "low";
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const handleRowClick = (id) => {
    navigate(`/leads/${id}`);
  };

  const handleCallLead = (lead) => {
    console.log("Call lead:", lead.name);
  };

  const handleEmailLead = (lead) => {
    console.log("Email lead:", lead.name);
  };

  const handleAddNote = (lead) => {
    console.log("Add note for:", lead.name);
  };

  // ===================== FILTER + SORT =====================

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Filter skor
    if (scoreFilter !== "all") {
      result = result.filter(
        (lead) => getScoreCategory(lead.score) === scoreFilter
      );
    }

    // Filter usia
    if (ageFilter !== "all") {
      result = result.filter((lead) => {
        if (ageFilter === "young") return lead.age < 30;
        if (ageFilter === "middle") return lead.age >= 30 && lead.age <= 50;
        if (ageFilter === "senior") return lead.age > 50;
        return true;
      });
    }

    // Filter pekerjaan
    if (jobFilter !== "all") {
      result = result.filter((lead) => {
        const job = (lead.job || lead.title || "").toLowerCase();

        if (jobFilter === "management")
          return (
            job.includes("manager") ||
            job.includes("head") ||
            job.includes("director")
          );

        if (jobFilter === "entrepreneur") return job.includes("entrepreneur");

        if (jobFilter === "professional")
          return (
            job.includes("engineer") ||
            job.includes("developer") ||
            job.includes("it") ||
            job.includes("consultant")
          );

        if (jobFilter === "others")
          return !(
            job.includes("manager") ||
            job.includes("head") ||
            job.includes("director") ||
            job.includes("entrepreneur") ||
            job.includes("engineer") ||
            job.includes("developer") ||
            job.includes("it") ||
            job.includes("consultant")
          );

        return true;
      });
    }

    // Filter status (Baru, Dihubungi, Follow Up, Konversi)
    if (statusFilter !== "all") {
      result = result.filter(
        (lead) =>
          (lead.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Pencarian
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((lead) => {
        const name = (lead.name || "").toLowerCase();
        const email = (lead.email || "").toLowerCase();
        const job = (lead.job || lead.title || "").toLowerCase();
        const phone = (lead.phone || "").toLowerCase();
        return (
          name.includes(q) ||
          email.includes(q) ||
          job.includes(q) ||
          phone.includes(q)
        );
      });
    }

    // Sorting
    if (sortField) {
      result.sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (sortField === "job") {
          valA = (a.job || a.title || "").toLowerCase();
          valB = (b.job || b.title || "").toLowerCase();
        }

        if (typeof valA === "string") {
          const cmp = valA.localeCompare(valB);
          return sortDir === "asc" ? cmp : -cmp;
        }

        if (typeof valA === "number") {
          return sortDir === "asc" ? valA - valB : valB - valA;
        }

        return 0;
      });
    }

    return result;
  }, [
    leads,
    scoreFilter,
    ageFilter,
    jobFilter,
    statusFilter,
    search,
    sortField,
    sortDir,
  ]);

  // ===================== STATS SUMMARY =====================

  const { totalLeads, highPriorityLeads, avgScore, followUpToday } =
    useMemo(() => {
      const total = filteredLeads.length;
      const high = filteredLeads.filter((lead) => lead.score >= 85).length;
      const avg =
        total === 0
          ? 0
          : Math.round(
              filteredLeads.reduce((sum, l) => sum + (l.score || 0), 0) / total
            );
      const followUp = filteredLeads.filter(
        (lead) => (lead.status || "").toLowerCase() === "follow up"
      ).length;

      return {
        totalLeads: total,
        highPriorityLeads: high,
        avgScore: avg,
        followUpToday: followUp,
      };
    }, [filteredLeads]);

  // ===================== RENDER =====================

  return (
    <>
      {/* HEADER ATAS */}
      <div className="top-header">
        <div className="header-left">
          <h1>Daftar Lead</h1>
        </div>
        <div className="header-right">
          <div className="search-box">
            <i className="fas fa-search" />
            <input
              type="text"
              placeholder="Cari nasabah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* KONTEN LEADS */}
      <div className="leads-content">
        {/* CARD FILTER */}
        <div className="filter-card-dark">
          <div className="filter-row">
            <button
              type="button"
              className="btn-dark-primary"
              onClick={() => console.log("Export lead")}
            >
              <i className="fas fa-file-export" /> <span>Export</span>
            </button>

            <button
              type="button"
              className="btn-dark-secondary"
              onClick={() => {
                setLeads([...mockLeads]);
                console.log("Refresh data");
              }}
            >
              <i className="fas fa-sync-alt" /> <span>Refresh</span>
            </button>

            <div className="filter-group-inline">
              <label>Skor:</label>
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
              >
                <option value="all">Semua Skor</option>
                <option value="high">Tinggi (≥ 85%)</option>
                <option value="medium">Sedang (70–84%)</option>
                <option value="low">Rendah (&lt; 70%)</option>
              </select>
            </div>

            <div className="filter-group-inline">
              <label>Usia:</label>
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
              >
                <option value="all">Semua Usia</option>
                <option value="young">&lt; 30 tahun</option>
                <option value="middle">30–50 tahun</option>
                <option value="senior">&gt; 50 tahun</option>
              </select>
            </div>

            <div className="filter-group-inline">
              <label>Pekerjaan:</label>
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
              >
                <option value="all">Semua Pekerjaan</option>
                <option value="management">Management</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="professional">Professional</option>
                <option value="others">Lainnya</option>
              </select>
            </div>

            <div className="filter-group-inline">
              <label>Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="Baru">Baru</option>
                <option value="Dihubungi">Dihubungi</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Konversi">Konversi</option>
              </select>
            </div>

            <div className="view-toggle-dark">
              <button
                type="button"
                className={`view-btn-dark ${view === "table" ? "active" : ""}`}
                onClick={() => setView("table")}
              >
                <i className="fas fa-table" />
              </button>
              <button
                type="button"
                className={`view-btn-dark ${view === "grid" ? "active" : ""}`}
                onClick={() => setView("grid")}
              >
                <i className="fas fa-th" />
              </button>
            </div>
          </div>
        </div>

        {/* CARD STATISTIK */}
        <div className="stats-card-dark">
          <div className="stat-item-dark">
            <span className="stat-label-dark">Total Lead</span>
            <span className="stat-value-dark">{totalLeads}</span>
          </div>
          <div className="stat-item-dark">
            <span className="stat-label-dark">Prioritas Tinggi</span>
            <span className="stat-value-dark">{highPriorityLeads}</span>
          </div>
          <div className="stat-item-dark">
            <span className="stat-label-dark">Rata-rata Skor</span>
            <span className="stat-value-dark">{avgScore}%</span>
          </div>
          <div className="stat-item-dark">
            <span className="stat-label-dark">Follow Up Hari Ini</span>
            <span className="stat-value-dark">{followUpToday}</span>
          </div>
        </div>

        {/* TABLE / GRID */}
        {view === "table" ? (
          <>
            <div className="table-container">
              <table className="leads-table">
                {/* ===== HEADER TABEL ===== */}
                <thead>
                  <tr>
                    <th onClick={() => handleSort("name")}>
                      Nama <i className="fas fa-sort" />
                    </th>
                    <th onClick={() => handleSort("phone")}>
                      Nomor Telepon <i className="fas fa-sort" />
                    </th>
                    <th onClick={() => handleSort("job")}>
                      Pekerjaan <i className="fas fa-sort" />
                    </th>
                    <th onClick={() => handleSort("score")}>
                      Skor Probabilitas <i className="fas fa-sort" />
                    </th>
                    <th>Kategori</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                {/* ===== BODY TABEL ===== */}
                <tbody>
                  {filteredLeads.map((lead) => {
                    const scoreCat = getScoreCategory(lead.score);

                    const statusKey = (lead.status || "").toLowerCase();
                    const statusClass =
                      statusKey === "baru"
                        ? "status-new"
                        : statusKey === "dihubungi"
                          ? "status-contacted"
                          : statusKey === "follow up"
                            ? "status-follow-up"
                            : statusKey === "konversi"
                              ? "status-converted"
                              : "";

                    return (
                      <tr key={lead.id} onClick={() => handleRowClick(lead.id)}>
                        {/* NAMA */}
                        <td>
                          <div className="name-cell">
                            <div className="avatar">
                              {(lead.name || "")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                            <div>
                              <strong>{lead.name}</strong>
                              {lead.email && (
                                <div style={{ fontSize: "0.75rem" }}>
                                  {lead.email}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* TELEPON */}
                        <td>{lead.phone}</td>

                        {/* PEKERJAAN */}
                        <td>{lead.job || lead.title}</td>

                        {/* SKOR PROBABILITAS */}
                        <td>
                          <div className="score-bar-container">
                            <div className="score-bar">
                              <div
                                className={`score-fill ${scoreCat}`}
                                style={{ width: `${lead.score}%` }}
                              />
                            </div>
                            <span className="score-text">{lead.score}%</span>
                          </div>
                        </td>

                        {/* KATEGORI */}
                        <td>
                          {scoreCat === "high" && (
                            <span className="badge-high">Sangat Tinggi</span>
                          )}
                          {scoreCat === "medium" && (
                            <span className="badge-medium">Tinggi</span>
                          )}
                          {scoreCat === "low" && (
                            <span className="badge-medium">Sedang</span>
                          )}
                        </td>

                        {/* STATUS */}
                        <td>
                          <span className={`status-badge ${statusClass}`}>
                            {formatStatusLabel(lead.status)}
                          </span>
                        </td>

                        {/* AKSI */}
                        <td>
                          <div className="action-buttons">
                            <button
                              type="button"
                              className="btn-icon-small"
                              title="Hubungi"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCallLead(lead);
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
                                handleEmailLead(lead);
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
                                handleAddNote(lead);
                              }}
                            >
                              <i className="fas fa-sticky-note" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center" }}>
                        Tidak ada data lead yang cocok dengan filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="pagination">
              <div className="pagination-info">
                Menampilkan <strong>{filteredLeads.length}</strong> lead
              </div>
              <div className="pagination-controls">
                <button className="pagination-btn" disabled>
                  <i className="fas fa-chevron-left" />
                </button>
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">3</button>
                <button className="pagination-btn">
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            </div>
          </>
        ) : (
          // ===================== GRID VIEW =====================
          <div className="leads-grid">
            {filteredLeads.map((lead) => {
              const scoreCat = getScoreCategory(lead.score);

              return (
                <div
                  key={lead.id}
                  className="lead-card-dark"
                  onClick={() => handleRowClick(lead.id)}
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
                          handleCallLead(lead);
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
                          handleEmailLead(lead);
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
                          handleAddNote(lead);
                        }}
                      >
                        <i className="fas fa-sticky-note" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredLeads.length === 0 && (
              <p style={{ marginTop: "0.8rem" }}>
                Tidak ada data lead yang cocok dengan filter.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Leads;
