import React, { useEffect, useState } from 'react'
import logowhite from './../../Assets/logowhite.png';
import { Link } from 'react-router-dom';
import './AdminNavbar.css'

const AdminNavbar = () => {
    const [accountType,setAccountType]=useState('')
    useEffect(()=>{
        
        setAccountType(localStorage.getItem('account_type'));
    },[])

  return (
    <div>
      <nav id="sidebar">
                <div className='admin-navbar-container'>
                <div className="admin-navbar">
                <img src={logowhite} alt="" className='admin-navbar-logo'/>
                {accountType==='admin'?<div className="admin-menu">
                    <Link className='adminnav-link' to='/dashboard'>
                        <div className="admin-nav-dashboard row">
                            <div className="col-2 p-0">
                            <i className="fa-solid fa-table-columns adminnav-menu"></i> 
                            </div>
                            <div className="col-10 p-0">
                                <p className="admin-dashboard-text m-0 adminnav-menu">Dashboard</p>
                            </div>                    
                        </div>
                </Link>
                <Link className='adminnav-link' to='/appointment-list'>
                    <div className="admin-nav-appointments row">
                        <div className="col-2 p-0">
                        <i className="fa-regular fa-calendar-check adminnav-menu"></i> 
                        </div>
                        <div className="col-10 p-0">
                            <p className="admin-appointments-text m-0 adminnav-menu">Appointments</p>
                        </div>
                    </div>
                </Link>
                <Link className='adminnav-link' to='/invoice-list'>
                    <div className="admin-nav-patients row">
                        <div className="col-2 p-0">
                        <i class="fa-solid fa-receipt adminnav-menu"></i>
                        </div>
                        <div className="col-10 p-0">
                        <p className="admin-patients-text m-0 adminnav-menu">Invoices</p> 
                        </div>
                    </div>
                </Link>
                <Link className='adminnav-link' to='/patient-list'>
                    <div className="admin-nav-patients row">
                        <div className="col-2 p-0">
                        <i className="fa-solid fa-hospital-user adminnav-menu"></i>   
                        </div>
                        <div className="col-10 p-0">
                        <p className="admin-patients-text m-0 adminnav-menu">Patients</p> 
                        </div>
                    </div>
                </Link>
                </div>:
                <Link className='adminnav-link-patient' to='/patient-list'>
                    <div className="admin-nav-patients row">
                        <div className="col-2 p-0">
                        <i className="fa-solid fa-hospital-user adminnav-menu"></i>   
                        </div>
                        <div className="col-10 p-0">
                        <span className="admin-patients-text m-0 adminnav-menu">Patients</span> 
                        </div>
                    </div>
                </Link>}
                
            </div>
            </div>
            </nav>
    </div>
  )
}

export default AdminNavbar
