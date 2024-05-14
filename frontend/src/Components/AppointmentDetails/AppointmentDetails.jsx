import React from 'react'
import './AppointmentDetails.css'

const AppointmentDetails = () => {
  return (
    <div className='app-details'>
      <div className="app-details-card">
        {/* header */}
        <div className="app-details-header py-4 px-4">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <h5 className='text-light m-0'>Appointment Rescheduled</h5>
                </div>
                <div className="col-2 text-end">
                    <i class="fa-solid fa-x text-light close-resched" ></i>
                </div>
            </div>
        </div>

        {/* rescheduled info */}
        <div className="row p-5 ">
            <div className="col-5 mb-2">Client Name:</div>
            <div className="col-7 mb-2">Giolliana Plandez</div>
            <div className="col-5 mb-2">Service Acquired:</div>
            <div className="col-7 mb-2">Teeth Cleaning</div>
            <div className="col-5 mb-2">Date:</div>
            <div className="col-7 mb-2">0/0/0</div>
            <div className="col-5 mb-2">Time:</div>
            <div className="col-7 mb-2">10:00 AM - 11:00 AM</div>
            <div className="button-okay text-center mt-5 mb-5">
                <button className='btn okay-button'>Accept Appointment</button>
            </div>
            <div className="col-6 resched-link">Reschedule</div>
            <div className="col-6 text-end cancel-link">Cancel Appointment</div>

        </div>
        
      </div>
    </div>
  )
}

export default AppointmentDetails
