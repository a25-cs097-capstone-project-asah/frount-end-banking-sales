import React from "react";

const ContactInfo = ({ contact, month, dayOfWeek, duration }) => {
  return (
    <div className="chart-card">
      <div className="card-header">
        <h3>Informasi Kontak</h3>
      </div>

      <p>Metode Kontak Terakhir: {contact}</p>
      <p>Bulan Dihubungi: {month}</p>
      <p>Hari Dihubungi: {dayOfWeek}</p>
      <p>Durasi Kontak: {duration} detik</p>
    </div>
  );
};

export default ContactInfo;
