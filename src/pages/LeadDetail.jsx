import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import Swal from "sweetalert2";

import LeadDetailHeader from "../components/leadDetail/LeadDetailHeader";
import LeadSummary from "../components/leadDetail/LeadSummary";

import ProfileNasabah from "../components/leadDetail/ProfileNasabah";
import ProfileKeuangan from "../components/leadDetail/ProfileKeuangan";
import ContactInfo from "../components/leadDetail/ContactInfo";

import LeadActivityPanel from "../components/leadDetail/LeadActivityPanel";
import InteractionTimeline from "../components/leadDetail/InteractionTimeline";

import ModalTambahCatatan from "../components/leadDetail/ModalCatatan";
import EmailModal from "../components/leadDetail/EmailModal";

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ============================= STATE ============================= */
  const [lead, setLead] = useState(null);

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editNoteText, setEditNoteText] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Email
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Riwayat Interaksi
  const [history, setHistory] = useState([]);

  /* ============================= FETCH LEAD ============================= */
  const fetchLead = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/leads/${id}`);
      setLead(res.data.data.lead);
    } catch {
      setErrorMsg("Gagal mengambil detail lead.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  /* ============================= FETCH NOTES ============================= */
  const fetchNotes = useCallback(async () => {
    try {
      const res = await api.get(`/leads/${id}/notes`);
      setNotes(res.data.data?.notes || []);
    } catch {
      setNotes([]);
    }
  }, [id]);

  /* ============================= FETCH HISTORY ============================= */
  const fetchHistory = useCallback(async () => {
    try {
      const res = await api.get(`/histories/leads/${id}`);
      setHistory(res.data.data?.histories || []);
    } catch {
      setHistory([]);
    }
  }, [id]);

  useEffect(() => {
    fetchLead();
    fetchNotes();
    fetchHistory();
  }, [fetchLead, fetchNotes, fetchHistory]);

  /* ============================= UPDATE STATUS ============================= */
  const handleStatusChange = async (e) => {
    try {
      const newStatus = e.target.value;

      await api.put(
        `/leads/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLead((prev) => ({ ...prev, status: newStatus }));
      fetchHistory();

      Swal.fire({
        title: "Status Berhasil Diubah!",
        text: `Status lead telah diperbarui menjadi: ${newStatus}`,
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal memperbarui status.",
      });
    }
  };

  /* ============================= ADD NOTE ============================= */
  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      setSaving(true);

      await api.post(
        `/leads/${id}/notes`,
        { body: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowAddModal(false);
      setNewNote("");

      fetchNotes();
      fetchHistory();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan catatan.",
      });
    } finally {
      setSaving(false);
    }
  };

  /* ============================= EDIT NOTE ============================= */
  const handleEditNote = (note) => {
    setEditNoteId(note.id);
    setEditNoteText(note.body);
    setShowEditModal(true);
  };

  const handleSaveEditNote = async () => {
    if (!editNoteText.trim()) return;

    try {
      await api.put(
        `/notes/${editNoteId}`,
        { body: editNoteText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowEditModal(false);
      setEditNoteText("");
      setEditNoteId(null);

      fetchNotes();
      fetchHistory();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengedit catatan.",
      });
    }
  };

  /* ============================= DELETE NOTE ============================= */
  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Hapus catatan ini?")) return;

    try {
      await api.delete(`/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchNotes();
      fetchHistory();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menghapus catatan.",
      });
    }
  };

  /* ============================= SEND EMAIL ============================= */
  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailBody.trim()) return;

    try {
      await api.post(
        `/leads/${id}/email`,
        { subject: emailSubject, message: emailBody },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowEmailModal(false);
      setEmailSubject("");
      setEmailBody("");

      Swal.fire({
        title: "Email Berhasil Dikirim!",
        text: "Pesan Anda telah berhasil terkirim.",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2983/2983788.png",
        imageWidth: 120,
        imageHeight: 120,
        confirmButtonColor: "#2563eb",
        confirmButtonText: "OK",
      });

      fetchHistory();
    } catch {
      Swal.fire({
        title: "Gagal Mengirim Email",
        text: "Silakan coba lagi atau periksa koneksi.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  /* ============================= RENDER ============================= */
  if (loading) return <p>Memuat data...</p>;
  if (errorMsg) return <p style={{ color: "red" }}>{errorMsg}</p>;

  return (
    <div className="lead-detail-page">
      <LeadDetailHeader onBack={() => navigate("/leads")} />

      <LeadSummary
        name={lead.name}
        job={lead.job}
        email={lead.email}
        phone={lead.phone}
        score={lead.probabilityScore}
        scoreClass={
          lead.probabilityScore >= 80
            ? "high"
            : lead.probabilityScore >= 60
              ? "medium"
              : "low"
        }
        status={lead.status}
        onStatusChange={handleStatusChange}
        onOpenNotesSection={() => setShowAddModal(true)}
        onEmail={() => setShowEmailModal(true)}
      />

      {/* ====================== GRID ====================== */}
      <div className="lead-detail-grid">
        <ProfileNasabah {...lead} />
        <ProfileKeuangan {...lead} />

        <ContactInfo {...lead} />
        <LeadActivityPanel
          notes={notes}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />

        <div className="full-row">
          <InteractionTimeline history={history} />
        </div>
      </div>

      {/* ====================== MODALS ====================== */}
      {showAddModal && (
        <ModalTambahCatatan
          noteText={newNote}
          setNoteText={setNewNote}
          onSave={handleAddNote}
          onClose={() => setShowAddModal(false)}
          saving={saving}
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-card-notes">
            <div className="modal-header">
              <h3>Edit Catatan</h3>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>

            <textarea
              className="modal-textarea"
              value={editNoteText}
              onChange={(e) => setEditNoteText(e.target.value)}
            />

            <button className="btn-primary full" onClick={handleSaveEditNote}>
              Simpan
            </button>
          </div>
        </div>
      )}

      {showEmailModal && (
        <EmailModal
          subject={emailSubject}
          setSubject={setEmailSubject}
          message={emailBody}
          setMessage={setEmailBody}
          onSend={handleSendEmail}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
};

export default LeadDetail;
