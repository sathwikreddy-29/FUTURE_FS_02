import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Setup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    setupSecret: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password, setupSecret } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('/api/auth/setup', { email, password, setupSecret });
      setSuccess('Admin account created successfully. You can now login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Setup failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass">
        <h1 className="login-title">Mini CRM Setup</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter a strong password"
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label htmlFor="setupSecret">Setup Secret</label>
            <input
              type="password"
              id="setupSecret"
              name="setupSecret"
              value={setupSecret}
              onChange={onChange}
              placeholder="Enter setup secret"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Setting up...' : 'Create Admin'}
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/login" className="link-button">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Setup;
