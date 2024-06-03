import React, { useEffect, useState } from 'react'
import './ViewAppointment.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const ViewAppointment = ({onClose, keyOfSelectedAppointment, appointments}) => {

  return (
    <div className='app-view'>
      <div className="app-view-card">
        {/* header */}
        <div className="app-view-header py-4 px-4">
            <div className="row">
                <div className="col-12 text-end"><i class="fa-solid fa-x text-light" onClick={()=>{onClose(); }}></i></div>
                <div className="col text-center">
                    <i class="fa-regular fa-calendar-check text-light fs-1 mb-3"></i>
                    <h5 className='text-light'>Appointment Confirmed</h5>
                </div>
            </div>
        </div>

        {/* rescheduled info */}
        {appointments.map((appointment,key)=>{
          if(appointment.a_id === keyOfSelectedAppointment){
            return(
                <div className="row p-5 " key={appointment.a_id}>
                <div className="col-5 mb-2">Client Name:</div>
                <div className="col-7 mb-2 fw-bold
                text-capitalize">{appointment.fname} {appointment.lname}</div>
                <div className="col-5 mb-2">Service Acquired:</div>
                <div className="col-7 mb-2 fw-bold
                text-capitalize">{appointment.service_}</div>
                <div className="col-5 mb-2">Date:</div>
                <div className="col-7 mb-2 fw-bold">{appointment.date_}</div>
                <div className="col-5 mb-2">Time:</div>
                <div className="col-7 mb-2 fw-bold">{appointment.time_}</div>
            </div>
            )
            
          }
        }
            
        )}
        
        
      </div>
    </div>
  )
}

export default ViewAppointment
