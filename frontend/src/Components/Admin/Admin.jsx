import React from 'react'
import logowhite from  './../../Assets/logowhite.png'
import './Admin.css'

const Admin = () => {
  return (
    <div className='admin-container'>
      <div className='admin-header'>
        <div className='admin-login-box'>
            <img src={logowhite} alt="" className='admin-logo'/>
            <h3 className='admin-dentsys'>DENTSYS</h3>
            <form action="">
                <div className="col-12 mb-3">
                <label htmlFor="" className="form-label admin-username" >Username</label>
                <input type="text" className="form-control " name='fname' id='fname' value="" onChange="" required/>
                </div>
                <div className="col-12 mb-3">
                <label htmlFor="" className="form-label admin-pass" >Password</label>
                <input type="password" className="form-control " name='fname' id='fname' value="" onChange="" required/>
                </div>
                
            </form>
            <button type="submit" className="btn admin-button d-flex justify-content-center" id="submit" onClick="">Login</button>
        </div>
      </div>
      <div className='admin-footer d-flex justify-content-center align-items-center '>
        <p className='copyright-p'>&copy; 2024 TOOTHIE CUTIE DENTAL CLINIC</p>
      </div>
    </div>
  )
}

export default Admin
