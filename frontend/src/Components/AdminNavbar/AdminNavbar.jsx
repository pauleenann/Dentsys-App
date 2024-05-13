import React from 'react'
import logowhite from './../../Assets/logowhite.png';

const AdminNavbar = () => {
  return (
    <div>
      <nav id="sidebar">
                <div className='admin-navbar-container'>
                <div className="admin-navbar">
                <img src={logowhite} alt="" className='admin-navbar-logo'/>
                <div className="admin-menu">
                <div className="admin-nav-dashboard row">
                    <div className="col-2 p-0">
                    <i className="fa-solid fa-table-columns adminnav-menu"></i> 
                    </div>
                    <div className="col-10 p-0">
                        <p className="admin-dashboard-text m-0 adminnav-menu">Dashboard</p>
                    </div>
                    
                </div>
                <div className="admin-nav-appointments row">
                    <div className="col-2 p-0">
                    <i className="fa-regular fa-calendar-check adminnav-menu"></i> 
                    </div>
                    <div className="col-10 p-0">
                        <p className="admin-appointments-text m-0 adminnav-menu">Appointments</p>
                    </div>
                </div>
                <div className="admin-nav-patients row">
                    <div className="col-2 p-0">
                    <i className="fa-solid fa-hospital-user adminnav-menu"></i>   
                    </div>
                    <div className="col-10 p-0">
                    <p className="admin-patients-text m-0 adminnav-menu">Patients</p> 
                    </div>
                    
                </div>
                </div>
            </div>
            </div>

                
            </nav>
    </div>
  )
}

export default AdminNavbar
