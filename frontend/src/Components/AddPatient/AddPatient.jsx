import React from 'react'
import './AddPatient.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'

const AddPatient = () => {
  return (
    <div className='wrapper'>
        <AdminNavbar></AdminNavbar>
      <div id="content">
        <AdminInfo></AdminInfo>
        <div className="row">
            
        </div>

      </div>
    </div>
  )
}

export default AddPatient
