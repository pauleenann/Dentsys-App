import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';
import './AdminAppointment.css';
import { Link, useNavigate } from 'react-router-dom';
import Reschedule from '../Reschedule/Reschedule';
import axios from 'axios';
import AppointmentConfirmed from '../AppoinmentConfirmed/AppointmentConfirmed';
import CancelAppointment from '../CancelAppointment/CancelAppointment';

const AdminAppointment = () => {
  const [showReschedule, setShowReschedule] = useState(false); // State to toggle Reschedule
  const [keyOfSelectedAppointment, setKeyOfSelectedAppointment] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');



  useEffect(() => {
    getAppointment();
  }, []);

  function getAppointment() {
    axios.get('http://localhost:80/api2/?action=getAppointments')
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setAppointment(response.data);
        } else {
          console.error('Data is not an array:', response.data);
          setAppointment([]);
        }
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
        setAppointment([]);
      });
  }

  const acceptAppointment = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the request is sent
    axios.put(`http://localhost:80/api2/${keyOfSelectedAppointment}/?action=accept`, appointment)
      .then(function (response) {
        console.log("response")
        console.log(response.data);
        if(response.data !== null){
          setShowConfirm(true);
        }else{
          console.log("Please try again");
        }
      })
      .finally(() => setLoading(false)); // Set loading to false when the request is completed
    console.log(appointment)
  }

  const filteredAppointments = appointment.filter(appt => {
    if (filter === 'all') return true;
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return appt.date_ === today;
    }
    if (filter === 'pending') return appt.status_ === 'pending';
    if (filter === 'cancelled') return appt.status_ === 'cancelled';
    if (filter === 'recent') return appt.status_ === 'finished'; // Assuming recent visits are finished appointments
    return true;
  });
  

  return (
    <div className="wrapper">
      <AdminNavbar />
      <div id="content">
        <AdminInfo />
        <div className="appoint-header">
          <h1>Appointments</h1>
          <button className='btn app-button-color'><i class="fa-regular fa-square-plus button-text text-light"></i><span className='text-light button-add'> Add an Appointment</span></button>
        </div>

        {/* buttons */}
        <div className="buttons">
          <button className='btn button-border-text button-radius' onClick={() => setFilter('all')}>All</button>
          <button className='btn button-border-text button-radius' onClick={() => setFilter('today')}>Appointments Today</button>
          <button className='btn button-border-text button-radius' onClick={() => setFilter('pending')}>Pending Appointments</button>
          <button className='btn button-border-text button-radius' onClick={() => setFilter('cancelled')}>Cancelled Appointments</button>
          <button className='btn button-border-text button-radius' onClick={() => setFilter('recent')}>Recent Visits</button>
        </div>


        {/* appointment list - pending*/}
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
                  <button className='btn button-resched ' onClick={(event) => { setKeyOfSelectedAppointment(appointment.a_id); setShowReschedule(true);}}>Reschedule</button>
                  <button className='btn' onClick={(event) => { setKeyOfSelectedAppointment(appointment.a_id); setShowCancel(true);}}><i className="fa-regular fa-circle-xmark button-delete"></i></button>
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
                  <button className='btn button-view-finished'>View</button>
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
                  <button className='btn button-accept' onClick={(event) => { setKeyOfSelectedAppointment(appointment.a_id); acceptAppointment(event); }}>Accept</button>
                  <button className='btn' onClick={(event) => { setKeyOfSelectedAppointment(appointment.a_id); setShowReschedule(true);}}><i className="fa-regular fa-calendar button-calendar"></i></button>
                  <button className='btn p-0' onClick={(event) => { setKeyOfSelectedAppointment(appointment.a_id); setShowCancel(true);}}><i className="fa-regular fa-circle-xmark button-delete"></i></button>
                </div>
              </div>
            );
          }else if(appointment.status_ === 'cancelled'){
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
                  <button className='btn button-view-cancelled'>View</button>
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
          <AppointmentConfirmed onClose={() => setShowConfirm(false)} keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment} />
        </div>
      )}

      {showCancel && (
        <div key={keyOfSelectedAppointment} className="cancelpage-overlay">
          <CancelAppointment onClose={() => setShowCancel(false)} keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment} />
        </div>
      )}

    </div>
  );
}

export default AdminAppointment;
