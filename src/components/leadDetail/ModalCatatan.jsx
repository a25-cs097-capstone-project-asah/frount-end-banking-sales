import React from "react";
import "./ModalCatatan.css";

const ModalCatatan = ({
  noteText = "",
  setNoteText,
  onSave,
  saving,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card-notes">
        {/* HEADER */}
        <div className="modal-header">
          <h3>Tambah Catatan</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* TEXTAREA INPUT */}
        <textarea
          className="modal-textarea"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Masukkan catatan kamu di sini..."
        />

        {/* SAVE BUTTON */}
        <button className="btn-primary full" onClick={onSave} disabled={saving}>
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
};

export default ModalCatatan;
