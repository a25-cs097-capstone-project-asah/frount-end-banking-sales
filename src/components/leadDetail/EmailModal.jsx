import React from "react";

const EmailModal = ({
  subject,
  setSubject,
  message,
  setMessage,
  onSend,
  onClose,
}) => {
  return (
    <div className="email-modal-overlay">
      <div className="email-modal-card">
        <div className="email-modal-header">
          <h3>Kirim Email</h3>
          <button className="email-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <label className="email-label">Subjek</label>
        <input
          className="email-input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label className="email-label">Pesan</label>
        <textarea
          className="email-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="email-send-btn" onClick={onSend}>
          Kirim Email
        </button>
      </div>
    </div>
  );
};

export default EmailModal;
