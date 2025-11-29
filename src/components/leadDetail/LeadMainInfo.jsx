import React from "react";

const LeadMainInfo = ({
  name,
  email,
  locate,
  phone,
  age,
  job,
  marital,
  education,
  housing,
  loan,
  balance,
  contact,
  month,
  dayOfWeek,
  duration,
  probabilityScore,
  category,
  status,
}) => {
  return (
    <section className="lead-main-info">
      {/* Profil Nasabah */}
      <div className="chart-card">
        <div className="card-header">
          <h3>Profil Nasabah</h3>
        </div>
        <p>Nama: {name}</p>
        <p>Email: {email}</p>
        <p>No. Telepon: {phone}</p>
        <p>Lokasi: {locate}</p>
        <p>Usia: {age} tahun</p>
        <p>Status Perkawinan: {marital}</p>
        <p>Pendidikan: {education}</p>
        <p>Status Lead: {status}</p>
      </div>

      {/* Profil Keuangan */}
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

      {/* Informasi Kontak */}
      <div className="chart-card">
        <div className="card-header">
          <h3>Informasi Kontak</h3>
        </div>
        <p>Metode Kontak Terakhir: {contact}</p>
        <p>Bulan Dihubungi: {month}</p>
        <p>Hari Dihubungi: {dayOfWeek}</p>
        <p>Durasi Kontak: {duration} detik</p>
      </div>
    </section>
  );
};

export default LeadMainInfo;
