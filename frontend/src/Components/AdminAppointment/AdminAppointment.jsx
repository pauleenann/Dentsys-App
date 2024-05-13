import React from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import './AdminAppointment.css'

const AdminAppointment = () => {
  return (
    <div className="wrapper">
            <AdminNavbar></AdminNavbar>
            <div id="content">
                <AdminInfo></AdminInfo>
                <div className="appoint-header">
                  <h1>Appointments</h1>
                  <button className='btn app-button-color'><i class="fa-regular fa-square-plus button-text text-light"></i><span className='text-light button-add'> Add an Appointment</span></button>
                </div>

                {/* buttons */}
                <div className="buttons">
                  <button className='btn button-border-text button-radius'>All</button>
                  <button className='btn button-border-text button-radius'>Appointments Today</button>
                  <button className='btn button-border-text button-radius'>Pending Appointments</button>
                  <button className='btn button-border-text button-radius'>Cancelled Appointments</button>
                  <button className='btn button-border-text  button-radius'>Recent Visits</button>
                </div>

                {/* appointment list - upcoming*/}
                <div className="row upcoming-row">
                  <div className="col">
                    <p className='m-0 app-patient-label'>Giolliana Plandez</p>
                    <p className='m-0 app-patient-info'>Tech Cleaning</p>
                  </div>
                  <div className="col app-patient-info">
                    10:00 AM - 11:00 AM
                  </div>
                  <div className="col app-patient-info">
                    UPCOMING
                  </div>
                  <div className="col ">
                    <button className='btn button-resched'>Reschedule</button>
                    <button className='btn'><i className="fa-regular fa-circle-xmark button-delete"></i></button>
                  </div>
                </div>

                {/* appointment list - pending*/}
                <div className="row pending-row">
                  <div className="col">
                    <p className='m-0 app-patient-label-pending'>Giolliana Plandez</p>
                    <p className='m-0 app-patient-info-pending'>Tech Cleaning</p>
                  </div>
                  <div className="col app-patient-info-pending">
                    10:00 AM - 11:00 AM
                  </div>
                  <div className="col app-patient-info-pending">
                    PENDING
                  </div>
                  <div className="col ">
                    <button className='btn button-accept'>Accept</button>
                    <button className='btn'><i class="fa-regular fa-calendar button-calendar button-calendar"></i></button>
                    <button className='btn p-0 '><i className="fa-regular fa-circle-xmark button-delete"></i></button>
                  </div>
                </div>

                {/* appointment list - finished*/}
                <div className="row finished-row">
                  <div className="col">
                    <p className='m-0 app-patient-label-finished'>Giolliana Plandez</p>
                    <p className='m-0 app-patient-info-finished'>Tech Cleaning</p>
                  </div>
                  <div className="col app-patient-info-finished">
                    10:00 AM - 11:00 AM
                  </div>
                  <div className="col app-patient-info-finished">
                    PENDING
                  </div>
                  <div className="col ">
                    <button className='btn button-view'>View</button>
                  </div>
                </div>
                  
            </div>
        </div>
  )
}

export default AdminAppointment

