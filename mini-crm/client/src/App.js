import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Setup from './pages/Setup';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!admin ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/setup"
        element={!admin ? <Setup /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={admin && admin.authenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={<Navigate to={admin ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;