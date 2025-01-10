import React, { useEffect } from 'react'
import './AppointmentCancelledConfirm.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server


const AppointmentCancelledConfirm = () => {
    //get appointmetn id using params
    const {id}= useParams();

    //cancel appointment based on the appointment id
    useEffect(()=>{
        cancelAppointment();
    },[])

    const cancelAppointment = async () => {
        const response = await axios.put(`https://prodbackenddentsys.tuplrc-cla.com/${id}/?action=cancel`);
        console.log(response.status);
        // if cancelled, emit socket
        if(response.status==200){
          socket.emit('cancellAppointment');
        }
        
    }

  return (
    <div className='app-cancelled-confirm'>
        <h1>Appointment Cancelled</h1>
        <p>Your appointment with Toothie Cutie Dental Clinic has been cancelled. If you wish to book a new appointment, go to <Link to='/appointment' className='link'>Toothie Cutie’s website.</Link></p>
    </div>
  )
}

export default AppointmentCancelledConfirm
