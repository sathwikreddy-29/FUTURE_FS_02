import React, { useState, useEffect } from 'react';

const LeadModal = ({ lead, onClose, onUpdate }) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes || '');
    }
  }, [lead]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(lead.id, notes);
    onClose();
  };

  if (!lead) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Lead Details - {lead.name}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone || 'Not provided'}</p>
          <p><strong>Source:</strong> {lead.source}</p>
          <p><strong>Status:</strong> <span className={`status-badge status-${lead.status}`}>{lead.status}</span></p>
          <p><strong>Created:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              placeholder="Add follow-up notes here..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;