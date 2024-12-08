import React, { useEffect, useState } from 'react'
import logowhite from './../../Assets/logowhite.png';
import { Link } from 'react-router-dom';
import './AdminNavbar.css'

const AdminNavbar = () => {
    const [accountType,setAccountType]=useState('')

    //stores user account type in accountType useState
    useEffect(()=>{
        setAccountType(localStorage.getItem('account_type'));
    },[])

    console.log(accountType)

  return (
    <div className='sidebar'>
        <img src={logowhite} alt="" className='sidebar-logo'/>
        <div className="sidebar-menu-container">
            {/* dashboard */}
            <Link className={`sidebar-menu row ${accountType === 'dentist' ? 'hide-menu' : ''}`} to='/dashboard'>
                <i className="fa-solid fa-table-columns col-2"></i> 
                <p className="col-10 m-0">Dashboard</p>     
            </Link>
            {/* appointments */}
            <Link className={`sidebar-menu row ${accountType === 'dentist' ? 'hide-menu' : ''}`} to='/appointment-list'>
                <i className="fa-regular fa-calendar-check col-2"></i> 
                <p className="col-10 m-0">Appointments</p>     
            </Link>
            {/* invoices */}
            <Link className={`sidebar-menu row ${accountType === 'dentist' ? 'hide-menu' : ''}`} to='/invoice-list'>
                <i className="fa-solid fa-receipt col-2"></i> 
                <p className="col-10 m-0">Invoices</p>     
            </Link>
            {/* patients */}
            <Link className={`sidebar-menu row`} to='/patient-list'>
                <i className="fa-solid fa-hospital-user col-2"></i> 
                <p className="col-10 m-0">Patients</p>     
            </Link>
            {/* accounts */}
            <Link className={`sidebar-menu row ${accountType === 'dentist' ? 'hide-menu' : ''}`} to='/accounts'>
                <i className="fa-solid fa-users col-2"></i> 
                <p className="col-10 m-0">Accounts</p>     
            </Link>
            {/* audit logs */}
            <Link className={`sidebar-menu row ${accountType === 'dentist' ? 'hide-menu' : ''}`} to='/audit'>
                <i className="fa-solid fa-file col-2"></i> 
                <p className="col-10 m-0">Audit Logs</p>     
            </Link>
            {/* reports */}
            <Link className={`sidebar-menu row ${accountType === 'dentist' ? 'hide-menu' : ''}`} to='/reports'>
                <i className="fa-solid fa-chart-line col-2"></i> 
                <p className="col-10 m-0">Reports</p>     
            </Link>
        </div>
    </div>
  )
}

export default AdminNavbar
