import React from "react";

const LeadsTable = ({
  leads = [],
  onSort,
  onRowClick,
  onCallLead,
  onEmailLead,
}) => {
  // Ambil inisial dari nama
  const getInitials = (name = "") =>
    name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  // Tentukan kategori langsung dari score
  const getScoreCategory = (score = 0) => {
    if (score >= 80) return "high";
    if (score >= 60) return "medium";
    return "low";
  };

  const handleEmailClick = (e, lead) => {
    e.stopPropagation();
    onEmailLead?.(lead);
  };

  const handleCallClick = (e, lead) => {
    e.stopPropagation();
    onCallLead?.(lead);
  };

  return (
    <div className="table-container">
      <table className="leads-table">
        <thead>
          <tr>
            <th onClick={() => onSort("name")}>
              Nama <i className="fas fa-sort" />
            </th>
            <th onClick={() => onSort("phone")}>
              Nomor Telepon <i className="fas fa-sort" />
            </th>
            <th onClick={() => onSort("job")}>
              Pekerjaan <i className="fas fa-sort" />
            </th>
            <th onClick={() => onSort("probabilityScore")}>
              Skor Probabilitas <i className="fas fa-sort" />
            </th>
            <th>Kategori</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {leads.length > 0 ? (
            leads.map((lead) => {
              const id = lead.id || lead.leadId || lead._id;
              const score = Number(lead.probabilityScore) || 0;
              const scoreCat = getScoreCategory(score);
              const initials = getInitials(lead.name);

              return (
                <tr key={id} onClick={() => onRowClick(lead)}>
                  {/* NAMA */}
                  <td>
                    <div className="name-cell">
                      <div className="avatar">{initials}</div>
                      <div className="name-info">
                        <strong>{lead.name}</strong>
                        {lead.email && (
                          <div className="email-text">{lead.email}</div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* TELEPON */}
                  <td>{lead.phone || "-"}</td>

                  {/* PEKERJAAN */}
                  <td>{lead.job || "-"}</td>

                  {/* SKOR */}
                  <td>
                    <div className="score-bar-container">
                      <div className="score-bar">
                        <div
                          className={`score-fill ${scoreCat}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="score-text">{score}%</span>
                    </div>
                  </td>

                  {/* KATEGORI */}
                  <td>
                    {scoreCat === "high" && (
                      <span className="badge-high">Tinggi</span>
                    )}
                    {scoreCat === "medium" && (
                      <span className="badge-medium">Sedang</span>
                    )}
                    {scoreCat === "low" && (
                      <span className="badge-low">Rendah</span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span className={`status-badge status-${lead.status}`}>
                      {lead.status
                        .replace("-", " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon-small"
                        onClick={(e) => handleEmailClick(e, lead)}
                      >
                        <i className="fas fa-envelope" />
                      </button>

                      <button
                        className="btn-icon-small"
                        onClick={(e) => handleCallClick(e, lead)}
                      >
                        <i className="fas fa-sticky-note" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="no-data">
                Tidak ada data lead yang cocok dengan filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
