import React from "react";

const LeadsTable = ({
  leads,
  onSort,
  getScoreCategory,
  formatStatusLabel,
  onRowClick,
  onCallLead,
  onEmailLead,
  onAddNote,
}) => {
  return (
    <>
      <div className="table-container">
        <table className="leads-table">
          {/* HEADER TABEL */}
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
              <th onClick={() => onSort("score")}>
                Skor Probabilitas <i className="fas fa-sort" />
              </th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          {/* BODY TABEL */}
          <tbody>
            {leads.map((lead) => {
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
                <tr key={lead.id} onClick={() => onRowClick(lead.id)}>
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
                          onCallLead(lead);
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
                          onEmailLead(lead);
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
                          onAddNote(lead);
                        }}
                      >
                        <i className="fas fa-sticky-note" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {leads.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  Tidak ada data lead yang cocok dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (dummy) */}
      <div className="pagination">
        <div className="pagination-info">
          Menampilkan <strong>{leads.length}</strong> lead
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
  );
};

export default LeadsTable;
