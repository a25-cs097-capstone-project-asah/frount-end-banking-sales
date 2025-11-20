import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { leadsData } from "../data/leadsMock";

// Dummy aktivitas per lead (nanti bisa diganti dari backend)
const leadActivitiesMock = [
  {
    id: 1,
    leadId: 1,
    type: "success",
    title: "Follow up berhasil",
    description: "Nasabah tertarik diskusi produk deposito berjangka.",
    channel: "Telepon",
    time: "10 menit lalu",
    status: "Berhasil",
    createdBy: "RM Andi",
  },
  {
    id: 2,
    leadId: 1,
    type: "info",
    title: "Email penawaran dikirim",
    description: "Proposal deposito 12 bulan telah dikirim.",
    channel: "Email",
    time: "1 jam lalu",
    status: "Terkirim",
    createdBy: "RM Andi",
  },
];

const getActivityIconClass = (type) => {
  if (type === "success") return "fas fa-check";
  if (type === "warning") return "fas fa-phone";
  return "fas fa-user-plus";
};

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const lead = useMemo(
    () => leadsData.find((item) => String(item.id) === String(id)),
    [id]
  );

  if (!lead) {
    return (
      <div className="lead-detail-page">
        <div className="detail-header-row">
          <button
            className="btn btn-outline btn-back"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left" />
            <span>Kembali</span>
          </button>
        </div>
        <h2>Lead tidak ditemukan</h2>
      </div>
    );
  }

  const {
    name,
    job,
    age,
    email,
    phone,
    city,
    company,
    score,
    productInterest,
    riskProfile,
    incomeRange,
    notes,
    segment,
  } = lead;

  const scoreClass = score >= 85 ? "high" : score >= 70 ? "medium" : "low";
  const displayName = name;
  const displayJob = job;

  const leadActivities = leadActivitiesMock.filter((a) => a.leadId === lead.id);

  const recommendations = [
    "Prioritaskan follow up dalam 24 jam dengan penawaran personal.",
    "Pertimbangkan paket deposito dengan tenor lebih panjang.",
    `Sesuaikan penawaran dengan profil risiko: ${riskProfile}.`,
  ];

  return (
    <div className="lead-detail-page">
      {/* ================= HEADER ================= */}
      <div className="detail-header-row">
        <div className="detail-header-left">
          <button
            className="btn btn-outline btn-back"
            onClick={() => navigate(-1)}
          >
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

      {/* ================= SUMMARY CARD ================= */}
      <section className="lead-summary-card">
        <div className="lead-summary-main">
          <div className="lead-summary-left">
            <div className="lead-avatar large">
              <span>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>

            <div className="lead-summary-info">
              <h2>{displayName}</h2>

              <p className="lead-summary-title">
                <i className="fas fa-briefcase" /> {displayJob}
              </p>

              <p>
                <i className="fas fa-envelope" /> {email}
              </p>
              <p>
                <i className="fas fa-phone" /> {phone}
              </p>
            </div>
          </div>

          <div className="lead-summary-score">
            <div className={`score-circle summary-score ${scoreClass}`}>
              <span>{score}%</span>
            </div>
            <div className="summary-score-text">
              <p className="summary-score-level">Prioritas Tinggi</p>
              <p className="summary-score-sub">Segera follow up</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="lead-summary-actions">
          <button className="summary-action-card">
            <div className="summary-action-icon">
              <i className="fas fa-phone" />
            </div>
            Telepon
          </button>

          <button className="summary-action-card">
            <div className="summary-action-icon">
              <i className="fas fa-envelope" />
            </div>
            Email
          </button>

          <button className="summary-action-card">
            <div className="summary-action-icon">
              <i className="fas fa-calendar" />
            </div>
            Jadwalkan
          </button>

          <button className="summary-action-card">
            <div className="summary-action-icon">
              <i className="fas fa-sticky-note" />
            </div>
            Catatan
          </button>
        </div>
      </section>

      {/* ================= GRID BAWAH ================= */}
      <div className="lead-detail-grid">
        {/* ---------- KIRI: Profil - Finansial - Minat ---------- */}
        <section className="lead-main-info">
          {/* Profil */}
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
            <ul className="recommendation-list">
              {recommendations.map((r, i) => (
                <li key={i}>
                  <i className="fas fa-lightbulb" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- KANAN: Aktivitas - Catatan ---------- */}
        <section className="lead-activity-section">
          {/* Aktivitas Terakhir */}
          <div className="activity-card">
            <div className="card-header">
              <h3>Aktivitas Terakhir</h3>
            </div>

            {leadActivities.map((act) => (
              <div key={act.id} className="activity-item">
                <div className={`activity-icon ${act.type}`}>
                  <i className={getActivityIconClass(act.type)} />
                </div>

                <div className="activity-details">
                  <strong>{act.title}</strong>
                  <p>{act.description}</p>
                  <span>
                    {act.time} • {act.channel} • {act.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Catatan Internal */}
          <div className="chart-card">
            <div className="card-header">
              <h3>Catatan Internal</h3>
            </div>
            <p>{notes || "Belum ada catatan."}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeadDetail;
