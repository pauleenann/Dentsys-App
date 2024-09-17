// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ children, allowedRoles }) => {
  // Retrieve the username and account type from localStorage
  const username = localStorage.getItem('username');
  const account_type = localStorage.getItem('account_type'); // Example: 'admin', 'dentist', etc.

  // If no username, redirect to login page
  if (!username) {
    return <Navigate to="/admin" replace />;
  }

  // Check if the user's account type is allowed for this route
  if (allowedRoles && !allowedRoles.includes(account_type)) {
    // Redirect based on account type
    switch (account_type) {
      case 'admin':
        return <Navigate to="/dashboard" replace />;
      case 'dentist':
        return <Navigate to="/dentist-page" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  // If the user is allowed, render the children (protected component)
  return children;
};

export default Protected;
