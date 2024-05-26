import React, { useEffect, useState } from 'react'
import './AppointmentConfirmed.css'
import axios from 'axios'

const AppointmentConfirmed = ({onClose, keyOfSelectedAppointment, appointments}) => {

  console.log(keyOfSelectedAppointment)


  return (
    <div className='app-confirmed'>
      <div className="app-confirmed-card">
        {/* header */}
        <div className="app-confirmed-header py-4 px-4">
            <div className="row">
                <div className="col-12 text-end"><i class="fa-solid fa-x text-light" onClick={onClose}></i></div>
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
                <div className="row p-5 ">
                <div className="col-5 mb-2">Client Name:</div>
                <div className="col-7 mb-2">{appointment.fname} {appointment.lname}</div>
                <div className="col-5 mb-2">Service Acquired:</div>
                <div className="col-7 mb-2">{appointment.service_}</div>
                <div className="col-5 mb-2">Date:</div>
                <div className="col-7 mb-2">{appointment.date_}</div>
                <div className="col-5 mb-2">Time:</div>
                <div className="col-7 mb-2">{appointment.time_}</div>
                <div className="col-12 text-center mt-5">
                    <i>Client has been emailed about the<br/>changes in their appointment</i>            
                </div>
                <div className="button-okay text-center mt-5 mb-5">
                    <button className='btn okay-button' >Okay</button>
                </div>
                <div className="col-6 resched-link">Reschedule</div>
                <div className="col-6 text-end cancel-link">Cancel Appointment</div>

            </div>
            )
            
          }
        }
            
        )}
        
        
      </div>
    </div>
  )
}

export default AppointmentConfirmed
