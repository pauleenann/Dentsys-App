import React, { useEffect } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import './AdminAppointment.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Reschedule from '../Reschedule/Reschedule'
import axios from 'axios'
import AppointmentConfirmed from '../AppoinmentConfirmed/AppointmentConfirmed'


const AdminAppointment = () => {
  const [showReschedule, setShowReschedule] = useState(false); // State to toggle Reschedule
  const [keyOfSelectedAppointment, setKeyOfSelectedAppointment] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [appointment, setAppointment] = useState([])

  useEffect(()=>{
    getAppointment()
  },[])

  function getAppointment(){
    axios.get('http://localhost:80/api2/users/').then(function(response){
      console.log(response.data);
      //saves data to state
      setAppointment(response.data);
    });
  }

  
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
                {/* <div className="row upcoming-row">
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
                    <button className='btn button-resched ' onClick={() => setShowReschedule(true)}>Reschedule</button>
                    <button className='btn'><i className="fa-regular fa-circle-xmark button-delete"></i></button>
                  </div>
                </div> */}

                {/* appointment list - pending*/}
                {appointment.map((appointment, key) => {
                  if(appointment.status === 'upcoming'){
                    return(
                      <div className="row upcoming-row">
                        <div className="col">
                          <p className='m-0 app-patient-label'>{appointment.fname} {appointment.lname}</p>
                          <p className='m-0 app-patient-info'>{appointment.service_}</p>
                        </div>
                        <div className="col app-patient-info">
                          {appointment.time_}
                        </div>
                        <div className="col app-patient-info">
                          UPCOMING
                        </div>
                        <div className="col ">
                          <button className='btn button-resched ' onClick={() => setShowReschedule(true)}>Reschedule</button>
                          <button className='btn'><i className="fa-regular fa-circle-xmark button-delete"></i></button>
                        </div>
                      </div>
                    );
                  }
                  else if(appointment.status === 'finished'){
                    return(
                      <div className="row finished-row">
                        <div className="col">
                          <p className='m-0 app-patient-label-finished'>{appointment.fname} {appointment.lname}</p>
                          <p className='m-0 app-patient-info-finished'>{appointment.service_}</p>
                        </div>
                        <div className="col app-patient-info-finished">
                          {appointment.time_}
                        </div>
                        <div className="col app-patient-info-finished">
                          FINISHED
                        </div>
                        <div className="col ">
                          <button className='btn button-view'>View</button>
                        </div>
                      </div>
                    );
                  }
                  else if (appointment.status === null) {
                    return (
                      <div className="row pending-row" key={key}>
                        <div className="col">
                          <p className='m-0 app-patient-label-pending'>{appointment.fname} {appointment.lname}</p>
                          <p className='m-0 app-patient-info-pending'>{appointment.service_}</p>
                        </div>
                        <div className="col app-patient-info-pending">
                          {appointment.time_}
                        </div>
                        <div className="col app-patient-info-pending">
                          PENDING
                        </div>
                        <div className="col">
                          <button className='btn button-accept' onClick={() => {setShowConfirm(true);setKeyOfSelectedAppointment(appointment.id); }}>Accept</button>
                          <button className='btn'><i className="fa-regular fa-calendar button-calendar"></i></button>
                          <button className='btn p-0'><i className="fa-regular fa-circle-xmark button-delete"></i></button>
                        </div>
                      </div>
                    );
                  } else {
                    return null; // Render nothing if the service is not 'pending'
                  }
              })}

                {/* appointment list - finished
                <div className="row finished-row">
                  <div className="col">
                    <p className='m-0 app-patient-label-finished'>Giolliana Plandez</p>
                    <p className='m-0 app-patient-info-finished'>Tech Cleaning</p>
                  </div>
                  <div className="col app-patient-info-finished">
                    10:00 AM - 11:00 AM
                  </div>
                  <div className="col app-patient-info-finished">
                    FINISHED
                  </div>
                  <div className="col ">
                    <button className='btn button-view'>View</button>
                  </div>
                </div> */}
                  
            </div>
            {/* shows reschedule component pag clinick resched button */}
            {showReschedule && (
        <div className="reschedule-overlay">
          <Reschedule onClose={() => setShowReschedule(false)} />
        </div>
      )}

      {showConfirm && (
        <div className="confirmpage-overlay">
          <AppointmentConfirmed onClose={()=> setShowConfirm(false)} keyOfSelectedAppointment={keyOfSelectedAppointment}></AppointmentConfirmed>
        </div>
      )}
        </div>
        
      
  )
}

export default AdminAppointment

