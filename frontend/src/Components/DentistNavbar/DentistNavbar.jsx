import React from 'react'
import logowhite from './../../Assets/logowhite.png';
import { Link } from 'react-router-dom';
import './DentistNavbar.css'

const DentistNavbar = () => {
  return (
    <div>
      <nav id="sidebar">
                <div className='admin-navbar-container'>
                <div className="admin-navbar">
                <img src={logowhite} alt="" className='admin-navbar-logo'/>
                <div className="admin-menu">
                
                <Link className='adminnav-link' to='/patient-list'>
                <div className="admin-nav-patients row">
                    <div className="col-2 p-0">
                    <i className="fa-solid fa-hospital-user adminnav-menu"></i>   
                    </div>
                    <div className="col-10 p-0">
                    <p className="admin-patients-text m-0 adminnav-menu">Patients</p> 
                    </div>
                    
                </div></Link>
                </div>
            </div>
            </div>

                
            </nav>
    </div>
  )
}

export default DentistNavbar
