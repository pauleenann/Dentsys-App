import React from 'react'
import './Reschedule.css'
import { useState } from 'react';
import axios from 'axios';
import isAuthenticated from '../Auth';

const Reschedule = ({ onClose, keyOfSelectedAppointment, appointments}) => {
    const [input, setInput] = useState({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false)
    console.log(keyOfSelectedAppointment, appointments);

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({...values, [name]:value}));
        
    }

    const rescheduleAppointment = (event) => {
        event.preventDefault();
        if (submitForm==false) {
            formValidation();
        }else if(submitForm){
            setLoading(true);
            axios.put(`http://localhost:80/api2/${keyOfSelectedAppointment}/?action=reschedule`, input)
                .then(function (response) {
                    console.log("response")
                    console.log(response.data);
                    window.location.reload();
                })
                .finally(() => setLoading(false)); 
            console.log(input); 
        }
        
    }

    const formValidation = ()=>{
        let error = {};

        if(!input.date_){
            error.date = 'Please choose a date';
        }
        if(!input.time_){
            error.time = 'Please choose the time';
        }
        if(Object.keys(error).length == 0){
            setSubmitForm(true)
        }else{
            setSubmitForm(false)
        }

        setErrors(error)
    }
    

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
                        <div className="col-6 fw-bold">{appointment.fname} {appointment.lname}</div>
                    </div>
                    </div>
                    {/* col for date */}
                    <div className="col-6">
                    <div className="row mb-2">
                        <div className="col-4">Date: </div>
                        <div className="col-8 fw-bold">{appointment.date_}</div>
                    </div>
                    </div>
                    {/* col for service */}
                    <div className="col-6">
                    <div className="row mb-2">
                        <div className="col-6">Service Acquired: </div>
                        <div className="col fw-bold">{appointment.service_}</div>
                    </div>
                    </div>
                    {/* col for time */}
                    <div className="col-6">
                    <div className="row mb-2">
                        <div className="col-4">Time: </div>
                        <div className="col-8 fw-bold">{appointment.time_}</div>
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
                        <input  type="date" id="date" name="date_" className="form-control labels" onChange={handleChange} onBlur={formValidation}/>
                        <p className="error-message">{errors.date}</p>
                </div>


                {/* time */}
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">Time</div>
                        <div className="col-6">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="9-10am" value="9:00 AM - 10:00 AM" onChange={handleChange} onBlur={formValidation}/>
                            <label class="form-check-label time-text" for="flexRadioDefault1">
                            9:00 AM - 10:00 AM
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="10-11am" value="10:00 AM - 11:00 AM" onChange={handleChange} onBlur={formValidation}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            10:00 AM - 11:00 AM
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="11-12am" value="11:00 AM - 12:00 PM" onChange={handleChange} onBlur={formValidation}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            11:00 AM - 12:00 PM
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="12-1pm" value="12:00 PM - 1:00 PM" onChange={handleChange} onBlur={formValidation}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            12:00 PM - 1:00 PM
                            </label>
                        </div>
                        </div>
                        <div className="col-6">
                    <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="1-2pm" value="1:00 PM - 2:00 PM" onChange={handleChange} onBlur={formValidation}/>
                            <label class="form-check-label time-text" for="flexRadioDefault1">
                            1:00 PM - 2:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="2-3pm" value="2:00 PM - 3:00 PM" onChange={handleChange} onBlur={formValidation}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            2:00 PM - 3:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="3-4pm" value="3:00 PM - 4:00 PM" onChange={handleChange} onBlur={formValidation}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            3:00 PM - 4:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="4-5pm" value="4:00 PM - 5:00 PM" onChange={handleChange} onBlur={formValidation}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            4:00 PM - 5:00 PM
                            </label>
                        </div>
                    </div>
                    <p className="error-message">{errors.time}</p>
                    </div>
                </div>
                <div className="mt-5 resched-button-container">
                    <button className='btn resched-button' onClick={rescheduleAppointment}>Reschedule</button>
                </div>
                
            </div>
        </div>
      {/* Loading screen */}
      {loading && (
          <div className="spinner-overlay">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          
        )}
    </div>
  )
}

export default isAuthenticated(Reschedule);

