import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import AdminDash from '../Components/AdminDash/AdminDash'
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'
import isAuthenticated from '../Components/Auth';
import axios from "axios";

const Dashboard = () => {
  return (
    <div>
      {/* <AdminNavbar></AdminNavbar> */}
      
      <AdminDash></AdminDash>
      
    </div>
  );
};

export default isAuthenticated(Dashboard);
