import React from 'react'
import logowhite from './../../Assets/logowhite.png';
import { Link } from 'react-router-dom';
import './DentistNavbar.css'


const DentistNavbar = () => {
  return (
    <div>
      <nav id="sidebar">
                <div className='dentist-navbar-container'>
                <div className="dentist-navbar">
                <img src={logowhite} alt="" className='dentist-navbar-logo'/>
                <div className="dentist-menu">
                <Link className='dentistnav-link' to='/dentist-page'>
                <div className="dentist-nav-patients row">
                    <div className="col-2 p-0">
                      <i className="fa-solid fa-hospital-user dentistnav-menu"></i>   
                    </div>
                    <div className="col-10 p-0">
                      <p className="dentist-patients-text m-0 dentistnav-menu">Patients</p> 
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
