import React from "react";

const ProfileKeuangan = ({
  job,
  balance,
  housing,
  loan,
  category,
  probabilityScore,
}) => {
  return (
    <div className="chart-card">
      <div className="card-header">
        <h3>Profil Keuangan</h3>
      </div>

      <p>Pekerjaan: {job}</p>
      <p>Saldo Nasabah: {balance}</p>
      <p>Memiliki Rumah: {housing}</p>
      <p>Memiliki Pinjaman: {loan}</p>
      <p>Kategori Lead: {category}</p>
      <p>Probability Score: {probabilityScore}%</p>
    </div>
  );
};

export default ProfileKeuangan;
