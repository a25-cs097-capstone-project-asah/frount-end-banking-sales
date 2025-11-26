import React from "react";

const LeadMainInfo = ({
  age,
  city,
  segment,
  incomeRange,
  job,
  company,
  riskProfile,
  productInterest,
  recommendations = [], // default aman
}) => {
  return (
    <section className="lead-main-info">
      {/* Profil Nasabah */}
      <div className="chart-card">
        <div className="card-header">
          <h3>Profil Nasabah</h3>
        </div>
        <p>Usia: {age} tahun</p>
        <p>Domisili: {city}</p>
        <p>Segmen: {segment || "Belum ditentukan"}</p>
      </div>

      {/* Profil Keuangan */}
      <div className="chart-card">
        <div className="card-header">
          <h3>Profil Keuangan</h3>
        </div>
        <p>Rentang penghasilan: {incomeRange}</p>
        <p>Pekerjaan: {job}</p>
        <p>Perusahaan: {company}</p>
        <p>Profil risiko: {riskProfile}</p>
      </div>

      {/* Minat & Produk */}
      <div className="chart-card">
        <div className="card-header">
          <h3>Minat & Produk</h3>
        </div>
        <p>
          Produk diminati: <strong>{productInterest}</strong>
        </p>
      </div>

      {/* Rekomendasi */}
      <div className="chart-card">
        <div className="card-header">
          <h3>Rekomendasi Tindakan</h3>
        </div>

        {recommendations.length === 0 ? (
          <p>Tidak ada rekomendasi.</p> // ✔ tidak error walaupun kosong
        ) : (
          <ul className="recommendation-list">
            {recommendations.map((r, i) => (
              <li key={i}>
                <i className="fas fa-lightbulb" /> {r}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default LeadMainInfo;
