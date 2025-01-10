import React, { useEffect, useState } from 'react'
import './CancelAppointment.css'
import axios from 'axios'
import isAuthenticated from '../Auth'
import io from 'socket.io-client';
import ReactDom from 'react-dom';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server

const CancelAppointment = ({open, close, keyOfSelectedAppointment, appointments}) => {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAppointment();
  }, []);

  const getAppointment =()=> {
    axios.get('https://prodbackenddentsys.tuplrc-cla.com/?action=getAppointments')
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

  const cancelAppointment = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request is sent
    const response = await axios.put(`https://prodbackenddentsys.tuplrc-cla.com/${keyOfSelectedAppointment}/?action=cancel`, appointment);
    if(response.status==200){
      socket.emit('newData');
      window.location.reload();
      setLoading(false)
    }
    console.log(appointment)
  }

  if(!open){
    return null
  }
  return ReactDom.createPortal(
    <div className='cancel-app'>
      <div className="cancel-app-card">
        {/* header */}
        <div className="cancel-app-header py-4 px-4">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <h5 className='text-light m-0 text-center '>Cancel an Appointment</h5>
                </div>
                <div className="col-2 text-end" onClick={close}>
                    <i class="fa-solid fa-x text-light close-resched" ></i>
                </div>
            </div>
        </div>

        {/* rescheduled info */}
        {appointments.map((appointment, index) => {
            if (appointment.a_id === keyOfSelectedAppointment) {
                return (
                <div className="row p-5 cancel-info" key={index}>
                  <div className="col-6 mb-2 black-color">Client Name:</div>
                  <div className="col-6 mb-2 fw-bold  black-color text-capitalize">{appointment.fname} {appointment.lname}</div>
                  <div className="col-6 mb-2 black-color">Service Acquired:</div>
                  <div className="col-6 mb-2 black-color fw-bold  ">{appointment.service_name}</div>
                  <div className="col-6 mb-2 black-color">Date:</div>
                  <div className="col-6 mb-2 black-color fw-bold  ">{appointment.date_}</div>
                  <div className="col-6 mb-2 black-color">Time:</div>
                  <div className="col-6 mb-2 black-color fw-bold  ">{appointment.time_}</div>
                  <div className="button-container text-center mt-5">
                      <button className='btn cancel-discard-button'>Discard</button>
                      <button className='btn cancel-button' onClick={cancelAppointment}>Cancel Appointment</button>
                  </div>
              </div>
                );
            } else {
                return null;
            }
            })}

        
        
      </div>
      {/* Loading screen */}
      {loading && (
          <div className="spinner-overlay">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
    </div>,
    document.getElementById('portal')
  )
}

export default isAuthenticated(CancelAppointment);
