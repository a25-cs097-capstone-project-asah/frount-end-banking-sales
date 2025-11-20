import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { leadsData } from "../data/leadsMock";

import LeadDetailHeader from "../components/leadDetail/LeadDetailHeader";
import LeadSummary from "../components/leadDetail/LeadSummary";
import LeadMainInfo from "../components/leadDetail/LeadMainInfo";
import LeadActivityPanel from "../components/leadDetail/LeadActivityPanel";

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
        <LeadDetailHeader onBack={() => navigate(-1)} />
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
      {/* HEADER ATAS */}
      <LeadDetailHeader onBack={() => navigate(-1)} />

      {/* SUMMARY CARD ATAS */}
      <LeadSummary
        name={displayName}
        job={displayJob}
        email={email}
        phone={phone}
        score={score}
        scoreClass={scoreClass}
      />

      {/* GRID BAWAH */}
      <div className="lead-detail-grid">
        {/* KIRI: Profil, Keuangan, Minat, Rekomendasi */}
        <LeadMainInfo
          age={age}
          city={city}
          segment={segment}
          incomeRange={incomeRange}
          job={job}
          company={company}
          riskProfile={riskProfile}
          productInterest={productInterest}
          recommendations={recommendations}
        />

        {/* KANAN: Aktivitas & Catatan */}
        <LeadActivityPanel activities={leadActivities} notes={notes} />
      </div>
    </div>
  );
};

export default LeadDetail;
