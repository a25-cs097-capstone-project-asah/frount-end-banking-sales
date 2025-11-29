import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";

import LeadDetailHeader from "../components/leadDetail/LeadDetailHeader";
import LeadSummary from "../components/leadDetail/LeadSummary";
import LeadMainInfo from "../components/leadDetail/LeadMainInfo";
import LeadActivityPanel from "../components/leadDetail/LeadActivityPanel";
import ModalTambahCatatan from "../components/leadDetail/ModalCatatan";

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [newNote, setNewNote] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editNoteText, setEditNoteText] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);

  const token = localStorage.getItem("token");

  /* ============================== FETCH LEAD ============================== */
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

  /* ============================== FETCH NOTES ============================== */
  const fetchNotes = useCallback(async () => {
    try {
      const res = await api.get(`/leads/${id}/notes`);
      const list = res.data.data?.notes || [];
      setNotes(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch notes error:", err);
      setNotes([]);
    }
  }, [id]);

  useEffect(() => {
    fetchLead();
    fetchNotes();
  }, [fetchLead, fetchNotes]);

  /* ============================== UPDATE STATUS ============================== */
  const handleStatusChange = async (e) => {
    try {
      const newStatus = e.target.value;

      await api.put(
        `/leads/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setLead((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("STATUS ERROR: ", err.response?.data || err);
      alert("Gagal memperbarui status.");
    }
  };

  /* ============================== ADD NOTE ============================== */
  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      setSaving(true);

      await api.post(
        `/leads/${id}/notes`,
        { body: newNote }, // <-- userId DIHAPUS
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewNote("");
      setShowAddModal(false);
      fetchNotes();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menambahkan catatan.");
    } finally {
      setSaving(false);
    }
  };

  /* ============================== EDIT NOTE ============================== */
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
        { body: editNoteText }, // <-- userId DIHAPUS
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShowEditModal(false);
      setEditNoteText("");
      setEditNoteId(null);
      fetchNotes();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengedit catatan.");
    }
  };

  /* ============================== DELETE NOTE ============================== */
  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Hapus catatan ini?")) return;

    try {
      await api.delete(`/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchNotes();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus catatan.");
    }
  };

  /* ============================== RENDER ============================== */

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
      />

      <div className="lead-detail-grid">
        <LeadMainInfo {...lead} />

        <LeadActivityPanel
          notes={notes}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>

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
    </div>
  );
};

export default LeadDetail;
