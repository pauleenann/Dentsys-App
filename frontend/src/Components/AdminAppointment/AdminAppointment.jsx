import React from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'

const AdminAppointment = () => {
  return (
    <div className="wrapper">
            <AdminNavbar></AdminNavbar>
            <div id="content">
                <AdminInfo></AdminInfo>
                
                   
            </div>
        </div>
  )
}

export default AdminAppointment
