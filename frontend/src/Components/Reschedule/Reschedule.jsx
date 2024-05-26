import React from 'react'
import './Reschedule.css'
import { useState } from 'react';


const Reschedule = ({ onClose, keyOfSelectedAppointment, appointments}) => {
    const [showRescheduled, setShowRescheduled] = useState(false);
    console.log(keyOfSelectedAppointment, appointments);

  return (
    <div className='resched-container'>
        <div className="resched-card">
            {/* row for header */}
            <div className="resched-header">
                <div className="col-2">
                    
                </div>
                <div className="col-8">
                    <h5 className='text-light m-0'>Reschedule Appointment</h5>
                </div>
                <div className="col-2 text-end">
                    <i class="fa-solid fa-x text-light close-resched" onClick={onClose}></i>
                </div>
            </div>

            {/* row for patient info */}
            <div className="row resched-patient-info">
                

            {appointments.map((appointment, index) => {
            if (appointment.a_id === keyOfSelectedAppointment) {
                return (
                <div key={index} className='row p-0'>
                    {/* col for client name */}
                    <div className="col-6">
                    <div className="row mb-2">
                        <div className="col-6">Client Name: </div>
                        <div className="col-6">{appointment.fname} {appointment.lname}</div>
                    </div>
                    </div>
                    {/* col for date */}
                    <div className="col-6">
                    <div className="row mb-2">
                        <div className="col-4">Date: </div>
                        <div className="col-8">{appointment.date_}</div>
                    </div>
                    </div>
                    {/* col for service */}
                    <div className="col-6">
                    <div className="row mb-2">
                        <div className="col-6">Service Acquired: </div>
                        <div className="col">{appointment.service_}</div>
                    </div>
                    </div>
                    {/* col for time */}
                    <div className="col-6">
                    <div className="row mb-2">
                        <div className="col-4">Time: </div>
                        <div className="col-8">{appointment.time_}</div>
                    </div>
                    </div>
                </div>
                );
            } else {
                return null;
            }
            })}


                <hr className='my-4'/>

                <h5 className='text-center mt-2 mb-4'>Choose a new date & time</h5>

                {/* date */}
                <div className="col-4">
                        <label htmlFor="" className="form-label labels" >Date</label>
                        <input  type="date" id="date" name="date_" className="form-control labels" />
                </div>


                {/* time */}
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">Time</div>
                        <div className="col-6">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="9-10am" value="9:00 AM - 10:00 AM"/>
                            <label class="form-check-label time-text" for="flexRadioDefault1">
                            9:00 AM - 10:00 AM
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="10-11am" value="10:00 AM - 11:00 AM" />
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            10:00 AM - 11:00 AM
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="11-12am" value="11:00 AM - 12:00 PM" />
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            11:00 AM - 12:00 PM
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="12-1pm" value="12:00 PM - 1:00 PM" />
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            12:00 PM - 1:00 PM
                            </label>
                        </div>
                        </div>
                        <div className="col-6">
                    <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="1-2pm" value="1:00 PM - 2:00 PM" />
                            <label class="form-check-label time-text" for="flexRadioDefault1">
                            1:00 PM - 2:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="2-3pm" value="2:00 PM - 3:00 PM" />
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            2:00 PM - 3:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="3-4pm" value="3:00 PM - 4:00 PM" />
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            3:00 PM - 4:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="4-5pm" value="4:00 PM - 5:00 PM" />
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            4:00 PM - 5:00 PM
                            </label>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="mt-5 resched-button-container">
                    <button className='btn resched-button'>Reschedule</button>
                </div>
                
            </div>
        </div>
      
    </div>
  )
}

export default Reschedule

