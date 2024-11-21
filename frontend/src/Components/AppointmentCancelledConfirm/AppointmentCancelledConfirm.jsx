import React, { useEffect } from 'react'
import './AppointmentCancelledConfirm.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


const AppointmentCancelledConfirm = () => {
    //get appointmetn id using params
    const {id}= useParams();
    useEffect(()=>{
        cancelAppointment();
    },[])

    const cancelAppointment = () => {
        axios.put(`http://localhost:80/api2/${id}/?action=cancel`)
          .then(function (response) {
            console.log("response")
            console.log(response.data);
        })
      }
  return (
    <div className='app-cancelled-confirm'>
        <h1>Appointment Cancelled</h1>
        <p>Your appointment with Toothie Cutie Dental Clinic has been cancelled. If you wish to book a new appointment, go to <Link to='/appointment' className='link'>Toothie Cutie’s website.</Link></p>
    </div>
  )
}

export default AppointmentCancelledConfirm
