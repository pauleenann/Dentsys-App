import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import AdminDash from '../Components/AdminDash/AdminDash'
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'
import { isAuthenticated } from 'C:/xampp/htdocs/Dentsys-App/frontend/src/Components/Auth';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    navigate('/admin');
    }
  }, [navigate]);

  return (
    <div>
      {/* <AdminNavbar></AdminNavbar> */}
      <AdminDash></AdminDash>
      
    </div>
  )
}

export default Dashboard
