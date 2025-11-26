import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";

// Komponen UI
import LeadDetailHeader from "../components/leadDetail/LeadDetailHeader";
import LeadSummary from "../components/leadDetail/LeadSummary";
import LeadMainInfo from "../components/leadDetail/LeadMainInfo";
import LeadActivityPanel from "../components/leadDetail/LeadActivityPanel";

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);

  // =========================
  // FETCH DETAIL LEAD
  // =========================
  const fetchLead = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/leads/${id}`);
      setLead(res.data.data.lead);
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal mengambil detail lead.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // =========================
  // FETCH NOTES
  // =========================
  const fetchNotes = useCallback(async () => {
    try {
      const res = await api.get(`/notes/${id}`);
      setNotes(res.data.data.notes || []);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {
    fetchLead();
    fetchNotes();
  }, [fetchLead, fetchNotes]);

  // =========================
  // ADD NOTE
  // =========================
  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      setSaving(true);

      await api.post("/notes", {
        leadId: id,
        body: newNote,
      });

      setNewNote("");
      fetchNotes(); // refresh notes
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan catatan.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING & ERROR
  // =========================
  if (loading) return <p>Memuat data...</p>;
  if (errorMsg) return <p style={{ color: "red" }}>{errorMsg}</p>;
  if (!lead) return <p>Lead tidak ditemukan.</p>;

  // =========================
  // NORMALISASI DATA
  // =========================
  const score = Number(lead.probabilityScore);
  const scoreClass = score >= 85 ? "high" : score >= 70 ? "medium" : "low";

  const recommendedActions = [
    "Lakukan follow up dalam 24 jam.",
    "Tawarkan promo deposit tenor panjang.",
    `Profil risiko: ${lead.riskProfile || "Tidak tersedia"}.`,
  ];

  return (
    <div className="lead-detail-page">
      <LeadDetailHeader onBack={() => navigate("/leads")} />

      <LeadSummary
        name={lead.name}
        job={lead.job}
        email={lead.email}
        phone={lead.phone}
        score={score}
        scoreClass={scoreClass}
      />

      <div className="lead-detail-grid">
        <LeadMainInfo
          age={lead.age}
          city={"-"}
          segment={lead.category}
          incomeRange={"-"}
          job={lead.job}
          company={"-"}
          riskProfile={lead.riskProfile || "-"}
          productInterest={"-"}
          recommendations={recommendedActions}
        />

        <LeadActivityPanel
          activities={[]}
          notes={notes}
          newNote={newNote}
          setNewNote={setNewNote}
          saving={saving}
          onAddNote={handleAddNote}
        />
      </div>
    </div>
  );
};

export default LeadDetail;
