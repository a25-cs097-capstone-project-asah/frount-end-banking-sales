import React from "react";

const LeadsFilterBar = ({
  scoreFilter,
  setScoreFilter,
  ageFilter,
  setAgeFilter,
  jobFilter,
  setJobFilter,
  jobOptions = [],
  statusFilter,
  setStatusFilter,
  statusOptions = [],
  view,
  setView,
  onRefresh,
  onExport,
}) => {
  return (
    <div className="filter-card-dark">
      <div className="filter-row">
        <button type="button" className="btn-dark-primary" onClick={onExport}>
          <i className="fas fa-file-export" /> <span>Export</span>
        </button>

        <button
          type="button"
          className="btn-dark-secondary"
          onClick={onRefresh}
        >
          <i className="fas fa-sync-alt" /> <span>Refresh</span>
        </button>

        {/* SKOR */}
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

        {/* USIA */}
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

        {/* PEKERJAAN (DINAMIS) */}
        <div className="filter-group-inline">
          <label>Pekerjaan:</label>
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
          >
            <option value="all">Semua Pekerjaan</option>
            {jobOptions.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>

        {/* STATUS (DINAMIS) */}
        <div className="filter-group-inline">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Semua Status</option>
            {statusOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* VIEW MODE */}
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
  );
};

export default LeadsFilterBar;
