import React from 'react'
import './CancelAppointment.css'

const CancelAppointment = () => {
  return (
    <div className='cancel-app'>
      <div className="cancel-app-card">
        {/* header */}
        <div className="cancel-app-header py-4 px-4">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <h5 className='text-light m-0 text-center '>Cancel an Appointment</h5>
                </div>
                <div className="col-2 text-end">
                    <i class="fa-solid fa-x text-light close-resched" ></i>
                </div>
            </div>
        </div>

        {/* rescheduled info */}
        <div className="row p-5 ">
            <div className="col-3 mb-2 black-color">Client Name:</div>
            <div className="col-3 mb-2 fw-bold  black-color">Giolliana Plandez</div>
            <div className="col-3 mb-2 black-color">Service Acquired:</div>
            <div className="col-3 mb-2 black-color fw-bold  ">Teeth Cleaning</div>
            <div className="col-3 mb-2 black-color">Date:</div>
            <div className="col-3 mb-2 black-color fw-bold  ">0/0/0</div>
            <div className="col-3 mb-2 black-color">Time:</div>
            <div className="col-3 mb-2 black-color fw-bold  ">10:00 AM - 11:00 AM</div>
            <div className="button-container text-center mt-4 mb-5">
                <button className='btn discard-button'>Discard</button>
                <button className='btn cancel-button'>Cancel Appointment</button>
            </div>

        </div>
        
      </div>
    </div>
  )
}

export default CancelAppointment
