import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getRole } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = getRole();
  const path = location.pathname;

  // Jika user role 'admin' tapi masuk ke halaman user
  if (path.startsWith('/reservasi') && role !== 'user') {
    return <Navigate to="/admin" replace />;
  }

  // Jika user role 'user' tapi masuk ke halaman admin
  if (path.startsWith('/admin') && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
