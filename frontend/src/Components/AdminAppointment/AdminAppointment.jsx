import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';
import './AdminAppointment.css';
import { Link, useNavigate } from 'react-router-dom';
import Reschedule from '../Reschedule/Reschedule';
import axios from 'axios';
import AppointmentConfirmed from '../AppoinmentConfirmed/AppointmentConfirmed';
import CancelAppointment from '../CancelAppointment/CancelAppointment';
import ViewAppointment from '../ViewAppointment/ViewAppointment';
import isAuthenticated from '../Auth';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server

const AdminAppointment = () => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [showView, setShowView] = useState(false);
  const [keyOfSelectedAppointment, setKeyOfSelectedAppointment] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');


  useEffect(() => {
   // Fetch appointments when the component is mounted
   getAppointment();

   //Listen for the 'updateData' event from the server
   socket.on('updatedData', ()=>{
    getAppointment();
    console.log('updated data');
  }); // Fetch updated appointments when event is emitted

   // Cleanup the event listener when the component unmounts
   return () => {
     socket.off('updatedData');
   };
  }, []);

  const getAppointment = async () => {
    try {
      const response = await axios.get("http://localhost:80/api2/?action=getAppointments");
      setAppointment(response.data); // Update state with fetched data
    } catch (err) {
      console.log(err);
    }
  };

  const acceptAppointment = async (id) => {
    console.log('accept appointment')
    console.log(keyOfSelectedAppointment)
    setLoading(true); // Set loading to true when the request is sent
    try{
      const response = await axios.put(`http://localhost:80/api2/${id}/?action=accept`, appointment)
      console.log(response)
      if(response.status==200){
        setShowConfirm(true);
        socket.emit('newData');
        setLoading(false);
      }
    }catch(err){
      console.log("An error occurred: ", err.message)
    }
    console.log(appointment)
  }
  
  const finishAppointment = async (id) => {
    console.log(id)
    setLoading(true); // Set loading to true when the request is sent
    const response = await axios.put(`http://localhost:80/api2/${id}/?action=finish`,appointment)
    if(response.status==200){
      socket.emit('newData');
      setLoading(false);
    }
    console.log(appointment)
  }

  console.log(appointment.length)

  const filteredAppointments = appointment.length!=0?appointment.filter(appt => {
    if (filter === 'all') return true;
    if (filter === 'today') {
      return appt.status_ === 'accepted';
    }
    if (filter === 'pending') return appt.status_ === 'pending';
    if (filter === 'cancelled') return appt.status_ === 'cancelled';
    if (filter === 'recent') return appt.status_ === 'finished'; // Assuming recent visits are finished appointments
    return true;
  }):[];

  console.log(appointment)

  console.log(appointment)
  return (
    <div className="wrapper">
      <AdminNavbar />
      <div id="content">
        <AdminInfo />
        <div className="appoint-header">
          <h1>Appointments</h1>
          <Link to='/add-appointment'><button className='btn app-button-color'><i class="fa-regular fa-square-plus button-text text-light"></i><span className='text-light button-add'> Add an Appointment</span></button></Link>
          
        </div>

        {/* buttons */}
        <div className="buttons">
          <button className='btn button-border-text button-radius filter-btn' onClick={() => setFilter('all')}>All</button>
          <button className='btn button-border-text button-radius' onClick={() => setFilter('today')}>Today</button>
          <button className='btn button-border-text button-radius' onClick={() => setFilter('pending')}>Pending</button>
          <button className='btn button-border-text button-radius' onClick={() => setFilter('cancelled')}>Cancelled</button>
          <button className='btn button-border-text button-radius' onClick={() => setFilter('recent')}>Recent Visits</button>
        </div>

        {/* appointment list - upcoming */}
        {filteredAppointments.map((appointment, index) => {
          if (appointment.status_ === 'accepted') {
            return (
              <div className="row upcoming-row" key={index}>
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
                <div className="col">
                  <button className='btn button-resched ' onClick={() => { setKeyOfSelectedAppointment(appointment.a_id); setShowReschedule(true);}}>Reschedule</button>
                  <button className='btn p-0 mx-2' onClick={()=>{
                    setKeyOfSelectedAppointment(appointment.a_id); finishAppointment(appointment.a_id);
                  }}><i class="fa-solid fa-check button-finish"></i></button>
                  <button className='btn p-0' onClick={() => { 
                    setKeyOfSelectedAppointment(appointment.a_id); 
                    setShowCancel(true);}}><i className="fa-regular fa-circle-xmark button-delete"></i></button>
                </div>
              </div>
            );
          } else if (appointment.status_ === 'finished') {
            return (
              <div className="row finished-row" key={index}>
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
                <div className="col">
                  <button className='btn button-view-finished' onClick={() => { setKeyOfSelectedAppointment(appointment.a_id); setShowView(true);}}>View</button>
                </div>
              </div>
            );
          } else if (appointment.status_ === 'pending') {
            return (
              <div className="row pending-row" key={index}>
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
                  {/* accept button */}
                  <button className='btn button-accept' onClick={() => {setKeyOfSelectedAppointment(appointment.a_id); acceptAppointment(appointment.a_id);}}>Accept</button>
                  {/* reschedule button */}
                  <button className='btn p-0 mx-2' onClick={(event) => { setKeyOfSelectedAppointment(appointment.a_id); setShowReschedule(true);}}><i className="fa-regular fa-calendar button-calendar"></i></button>
                  {/* cancel button */}
                  <button className='btn p-0' onClick={() => { setKeyOfSelectedAppointment(appointment.a_id); setShowCancel(true);}}><i className="fa-regular fa-circle-xmark button-delete"></i></button>
                </div>
              </div>
            );
          }
           else {
            return null; 
          }
        })}

        {/* display cancelled appointments */}
        {filteredAppointments.map((appointment, index) => {
          if(appointment.status_ === 'cancelled'){
            return (
              <div className="row cancelled-row" key={index}>
                <div className="col">
                  <p className='m-0 app-patient-label-cancelled'>{appointment.fname} {appointment.lname}</p>
                  <p className='m-0 app-patient-info-cancelled'>{appointment.service_}</p>
                </div>
                <div className="col app-patient-info-cancelled">
                  {appointment.time_}
                </div>
                <div className="col app-patient-info-cancelled">
                  CANCELLED
                </div>
                <div className="col">
                  
                </div>
              </div>
            );
          }
           else {
            return null; 
          }
        })}


        {/* Loading screen */}
        {loading && (
          <div className="spinner-overlay">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          
        )}

      </div>

      {/* shows reschedule component pag clinick resched button */}
      {showReschedule && (
        <div className="reschedule-overlay">
          <Reschedule onClose={() => setShowReschedule(false)} keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment}/>
        </div>
      )}

      {/* Show confirmation dialog */}
      {showConfirm && (
        <div key={keyOfSelectedAppointment} className="confirmpage-overlay">
          <AppointmentConfirmed onClose={() => { window.location.reload();;
            setShowConfirm(false)}} keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment} />
        </div>
      )}

      {showCancel && (
        <div key={keyOfSelectedAppointment} className="cancelpage-overlay">
          <CancelAppointment onClose={() => setShowCancel(false)} keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment} />
        </div>
      )}

      {showView && (
        <div key={keyOfSelectedAppointment} className="viewpage-overlay">
          <ViewAppointment onClose={() => setShowView(false)} keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment} />
        </div>
      )}

    </div>
  );
}

export default isAuthenticated(AdminAppointment);
