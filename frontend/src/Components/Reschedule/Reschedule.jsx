import React, { useEffect } from 'react'
import './Reschedule.css'
import { useState } from 'react';
import axios from 'axios';
import isAuthenticated from '../Auth';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server


const Reschedule = ({ onClose, keyOfSelectedAppointment, appointments}) => {
    const [input, setInput] = useState({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false)
    const [occupiedTime, setOccupiedTime] = useState([])
    const [minDate, setMinDate] = useState("");
    console.log(keyOfSelectedAppointment, appointments);
    const appointmentTime = [
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM",
        "1:00 PM - 2:00 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM",
        "4:00 PM - 5:00 PM"
    ]

    useEffect(() => {
        // Calculate today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today); // Set the state for the minimum date
    }, []);

     //this useEffect runs for the first render, and everytime formdate.date_ changes
     useEffect(()=>{
        if(input.date_){
            getUnavailableTime(input.date_)
        }

        setInput((prevData)=>({
            ...prevData,
            time_:''
        }))
    },[input.date_])

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({...values, [name]:value}));
    }

    const rescheduleAppointment = async () => {
        if (submitForm==false) {
            formValidation();
        }else if(submitForm){
            try{
                setLoading(true);
                const response =await axios.put(`http://localhost:80/api2/${keyOfSelectedAppointment}/?action=reschedule`, input).finally(() => setLoading(false)); 
                console.log(response)
                if(response.status==200){
                    socket.emit('newData');
                }
                window.location.reload();
            }catch(err){
                console.log(err);
            }
        }
    }

    const getUnavailableTime = (date) => {
        const times = []
        axios.get(`http://localhost:80/api2/${date}/?action=getUnavailableTime`)
          .then(response => {
            console.log(response.data)
            const results = response.data;
            if(results.length>0){
                results.forEach(result=>{
                    times.push(result.time_)
                })
            }
            setOccupiedTime(times);
          })
          .catch(error => {
            console.error('Error fetching total pending appointments:', error);
          });
    };

    const unavailableTime = (time)=>{

        //set inputted date as chosen date
        const chosenDate = input.date_?input.date_:'';

        //set time today as the hour in 24 hour format
        const timeToday = new Date().getHours();
        console.log('hour today: ', timeToday)

        //get each hour sa options
        const splitTime = time.split(' ');
        const hour = parseInt(splitTime[0].split(':')[0]);//get the hour

        //if hour is greater than 12, add 12 to convert to 24 hour format
        const hour24Format = hour<5?hour+12:hour;
        console.log('hour ',hour24Format);
      
        //logic: if hour24format (hour sa options) ay less than or equal doon sa current time AND yung piniling date ng user ay same sa date ngayon, return TRUE (ibig sabihin, disabled yung radio button na un)
        return hour24Format<=timeToday&&chosenDate==minDate;
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
                <div key={index} className='row p-0 resched-info'>
                    {/* col for client name */}
                    <div className="col-6">
                    <div className="row mb-2">
                        <div className="col-6">Client Name: </div>
                        <div className="col-6 fw-bold resched-name">{appointment.fname} {appointment.lname}</div>
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

                <h5 className='text-center mt-2 mb-4 resched-info'>Choose a new date & time</h5>

                {/* date */}
                <div className="col-4">
                        <label htmlFor="" className="form-label labels" >Date</label>
                        <input  type="date" id="date" name="date_" className="form-control labels" value={input.date_} onChange={handleChange} onBlur={formValidation} min={minDate}/>
                        <p className="error-message">{errors.date}</p>
                </div>

                {/* time */}
                <div className="col-8">
                    <label htmlFor="" className="form-label labels" >Time <span className='required-field'>*</span></label>
                    <div className="row">
                        <div className="col-xl-6 col-sm-12 mb-3">
                            {/* iterate appointment time array */}
                            {appointmentTime.map((time,index)=>{
                                // if yung index ay di pa umaaabot ng 4, display first 4 time in the first column
                                if(index<=3){
                                    return <div class="form-check">
                                    <input class="form-check-input" type="radio" name="time_" id="" value={time} onChange={handleChange} onBlur={formValidation} disabled={
                                        // occupiedTime.includes(time);
                                        unavailableTime(time)
                                    } checked={input.time_===time}/>
                                    <label class="form-check-label time-text" for="flexRadioDefault1">
                                    {time}
                                    </label>
                                </div>
                                }
                           })}
                        </div>
                        <div className="col-xl-6 col-sm-12 mb-3">
                            {/* iterate appointment time array */}
                            {appointmentTime.map((time,index)=>{
                                // if yung index ay greater than 3, display ung natitirang time
                                if(index>3){
                                    return <div class="form-check">
                                    <input class="form-check-input" type="radio" name="time_" id="" value={time} onChange={handleChange} onBlur={formValidation} disabled={unavailableTime(time)} checked={input.time_===time}/>
                                    <label class="form-check-label time-text" for="flexRadioDefault1">
                                    {time}
                                    </label>
                                </div>
                                }
                           })}
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

