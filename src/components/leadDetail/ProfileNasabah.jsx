import React from "react";

const ProfileNasabah = ({
  name,
  email,
  phone,
  locate,
  age,
  marital,
  education,
  status,
}) => {
  return (
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
  );
};

export default ProfileNasabah;
