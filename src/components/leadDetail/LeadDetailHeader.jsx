import React from "react";

const LeadDetailHeader = ({ onBack }) => {
  return (
    <div className="detail-header-row">
      <div className="detail-header-left">
        <button className="btn btn-outline btn-back" onClick={onBack}>
          <i className="fas fa-arrow-left" />
          <span>Kembali</span>
        </button>
        <h1>Detail Nasabah</h1>
      </div>

      <div className="detail-header-actions">
        <button className="btn btn-primary btn-header-primary">
          <i className="fas fa-phone" /> Hubungi
        </button>

        <button className="btn btn-outline btn-header-secondary">
          <i className="fas fa-envelope" /> Email
        </button>
      </div>
    </div>
  );
};

export default LeadDetailHeader;
