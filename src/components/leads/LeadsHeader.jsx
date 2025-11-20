import React from "react";

const LeadsHeader = ({ search, onSearchChange }) => {
  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsHeader;
