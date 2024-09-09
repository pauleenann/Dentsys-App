import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const isAuthenticated = (Component) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const username = localStorage.getItem('username');
      if (!username) {
        navigate('/admin');
      }
    }, [navigate]);

    return <Component {...props} />;
  };
};

export default isAuthenticated;