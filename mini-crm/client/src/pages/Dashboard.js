import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LeadModal from '../components/LeadModal';
import Toast from '../components/Toast';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [toast, setToast] = useState(null);

  const { logout } = useAuth();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, filters]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('/api/leads');
      setLeads(res.data);
    } catch (error) {
      showToast('Error fetching leads', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }

    if (filters.search) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await axios.put(`/api/leads/${leadId}`, { status: newStatus });
      setLeads(leads.map(lead =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
      showToast('Status updated successfully', 'success');
    } catch (error) {
      showToast('Error updating status', 'error');
    }
  };

  const handleDelete = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await axios.delete(`/api/leads/${leadId}`);
        setLeads(leads.filter(lead => lead.id !== leadId));
        showToast('Lead deleted successfully', 'success');
      } catch (error) {
        showToast('Error deleting lead', 'error');
      }
    }
  };

  const openModal = (lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLead(null);
  };

  const updateLeadNotes = async (leadId, notes) => {
    try {
      await axios.put(`/api/leads/${leadId}`, { notes });
      setLeads(leads.map(lead =>
        lead.id === leadId ? { ...lead, notes } : lead
      ));
      showToast('Notes updated successfully', 'success');
    } catch (error) {
      showToast('Error updating notes', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusBadge = (status) => {
    const classes = {
      new: 'status-new',
      contacted: 'status-contacted',
      converted: 'status-converted'
    };
    return <span className={`status-badge ${classes[status]}`}>{status}</span>;
  };

  const stats = {
    total: leads.length,
    new: leads.filter(lead => lead.status === 'new').length,
    contacted: leads.filter(lead => lead.status === 'contacted').length,
    converted: leads.filter(lead => lead.status === 'converted').length
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Mini CRM Dashboard</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Leads</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.new}</div>
          <div className="stat-label">New Leads</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.contacted}</div>
          <div className="stat-label">Contacted</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.converted}</div>
          <div className="stat-label">Converted</div>
        </div>
      </div>

      <div className="leads-section">
        <h2 className="section-title">Leads Management</h2>

        <div className="filters">
          <div className="filter-group">
            <label>Filter by Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by name or email"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="empty-state">
            <h3>No leads found</h3>
            <p>{leads.length === 0 ? 'No leads have been added yet.' : 'Try adjusting your filters.'}</p>
          </div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Source</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone || '-'}</td>
                  <td>{lead.source}</td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                  </td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="btn btn-secondary"
                        onClick={() => openModal(lead)}
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        Notes
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(lead.id)}
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <LeadModal
          lead={selectedLead}
          onClose={closeModal}
          onUpdate={updateLeadNotes}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Dashboard;