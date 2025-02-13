import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token); 
    const isAdmin = decodedToken.role === 'admin'; 

    if (isAdmin) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default AuthGuard;
