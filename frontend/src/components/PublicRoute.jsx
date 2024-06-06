import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, adminRoute = false }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const admin = useSelector(state => state.admin.admin);

  if (adminRoute && admin) {
    return <Navigate to="/admin" />;
  }

  if (!adminRoute && isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default PublicRoute;