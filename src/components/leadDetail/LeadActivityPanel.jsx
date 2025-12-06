import React from "react";

const LeadActivityPanel = ({ notes, onEditNote, onDeleteNote }) => {
  return (
    <div className="activity-panel">
      {/* HEADER SAMA DENGAN CARD LAIN */}
      <div className="card-header">
        <h3>Catatan Sales</h3>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div className="chart-card note-item" key={note.id}>
            {/* HEADER NAMA & TANGGAL */}
            <div className="note-header">
              <strong>{note.userName || "Sales"}</strong>
              <span className="note-date">
                {new Date(note.createdAt).toLocaleDateString("id-ID")}
              </span>
            </div>

            {/* ISI */}
            <p className="note-body">{note.body}</p>

            {/* BUTTON ACTION */}
            <div className="note-actions">
              <button className="btn-edit" onClick={() => onEditNote(note)}>
                Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => onDeleteNote(note.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadActivityPanel;
