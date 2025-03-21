import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';
import './AdminAppointment.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Reschedule from '../Reschedule/Reschedule';
import axios from 'axios';
import AppointmentConfirmed from '../AppoinmentConfirmed/AppointmentConfirmed';
import CancelAppointment from '../CancelAppointment/CancelAppointment';
import ViewAppointment from '../ViewAppointment/ViewAppointment';
import isAuthenticated from '../Auth';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server


const AdminAppointment = () => {
  // const [showReschedule, setShowReschedule] = useState(false);
  const [showView, setShowView] = useState(false);
  const [keyOfSelectedAppointment, setKeyOfSelectedAppointment] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const queryFilter = searchParams.get('filter');
  const loggedin = localStorage.getItem("username")

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

  useEffect(()=>{
    setFilter(queryFilter)
  },[queryFilter])

  console.log(queryFilter)

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
    const response = await axios.put(`http://localhost:80/api2/${id}/?action=finish`,{loggedin:loggedin, ...appointment,})
    if(response.status==200){
      socket.emit('newData');
      setLoading(false);
    }
    window.location.reload()
    console.log(appointment)
  }
  
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

  return (
    <div className="admin-appointment-container">
      <AdminNavbar />
      <div className="content">
        <AdminInfo />
        {/* header */}
        <div className="appoint-header">
          <h1>Appointments</h1>
          <Link to='/add-appointment'><button className='btn'><i class="fa-regular fa-square-plus"></i><span className='text-light'> Add an Appointment</span></button></Link>
        </div>

        {/* buttons */}
        <div className="buttons">
          <button className={`btn ${filter=='all'?'filter-selected':''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`btn ${filter=='today'?'filter-selected':''}`} onClick={() => setFilter('today')}>Today</button>
          <button className={`btn ${filter=='pending'?'filter-selected':''}`} onClick={() => setFilter('pending')}>Pending</button>
          <button className={`btn ${filter=='cancelled'?'filter-selected':''}`} onClick={() => setFilter('cancelled')}>Cancelled</button>
          <button className={`btn ${filter=='recent'?'filter-selected':''}`} onClick={() => setFilter('recent')}>Recent Visits</button>
        </div>

        {/* appointment list - upcoming */}
        {filteredAppointments.map((appointment, index) => {
          if (appointment.status_ === 'accepted') {
            return (
              <div className="row app-row upcoming-row" key={index}>
                <div className="col">
                  <p className='m-0 app-patient-label'>{appointment.fname} {appointment.lname}</p>
                  <p className='m-0 app-patient-label-sub'>{appointment.service_name}</p>
                </div>
                <div className="col app-patient-info">
                  {appointment.time_}
                </div>
                <div className="col app-patient-info">
                  {appointment.date_}
                </div>
                <div className="col app-patient-info">
                  {appointment.phone}
                </div>
                <div className="col app-patient-info">
                  UPCOMING
                </div>
                <div className="col app-actions text-end">
                  {/* <button className='btn button-resched ' onClick={() => { setKeyOfSelectedAppointment(appointment.a_id); setShowReschedule(true);}}>Reschedule</button> */}
                  <button className='btn app-finish' onClick={()=>{
                    setKeyOfSelectedAppointment(appointment.a_id); finishAppointment(appointment.a_id);
                  }}><i class="fa-solid fa-check button-finish"></i></button>
                  <button className='btn app-cancel' onClick={() => { 
                    setKeyOfSelectedAppointment(appointment.a_id); 
                    setShowCancel(true);}}><i className="fa-regular fa-circle-xmark button-delete"></i></button>
                </div>
              </div>
            );
          } else if (appointment.status_ === 'finished') {
            return (
              <div className="row app-row finished-row" key={index}>
                <div className="col">
                  <p className='m-0 app-patient-label'>{appointment.fname} {appointment.lname}</p>
                  <p className='m-0 app-patient-label-sub'>{appointment.service_name}</p>
                </div>
                <div className="col app-patient-info">
                  {appointment.time_}
                </div>
                <div className="col app-patient-info">
                  {appointment.date_}
                </div>
                <div className="col app-patient-info">
                  {appointment.phone}
                </div>
                <div className="col app-patient-info">
                  FINISHED
                </div>
                <div className="col app-actions text-end">
                  <button className='btn app-finish-view' onClick={() => { setKeyOfSelectedAppointment(appointment.a_id); setShowView(true);}}>View</button>
                </div>
              </div>
            );
          } else if (appointment.status_ === 'pending') {
            return (
              <div className="row app-row pending-row" key={index}>
                <div className="col">
                  <p className='m-0 app-patient-label'>{appointment.fname} {appointment.lname}</p>
                  <p className='m-0 app-patient-label-sub'>{appointment.service_name}</p>
                </div>
                <div className="col app-patient-info">
                  {appointment.time_}
                </div>
                <div className="col app-patient-info">
                  {appointment.date_}
                </div>
                <div className="col app-patient-info">
                  {appointment.phone}
                </div>
                <div className="col app-patient-info">
                  PENDING
                </div>
                <div className="col app-actions text-end">
                  {/* accept button */}
                  <button className='btn app-accept' onClick={() => {setKeyOfSelectedAppointment(appointment.a_id); acceptAppointment(appointment.a_id);}}>Accept</button>
                  {/* reschedule button */}
                  {/* <button className='btn p-0 mx-2' onClick={(event) => { setKeyOfSelectedAppointment(appointment.a_id); setShowReschedule(true);}}><i className="fa-regular fa-calendar button-calendar"></i></button> */}
                  {/* cancel button */}
                  <button className='btn app-cancel p-0' onClick={() => { setKeyOfSelectedAppointment(appointment.a_id); setShowCancel(true);}}><i className="fa-regular fa-circle-xmark button-delete"></i></button>
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
              <div className="row app-row cancelled-row" key={index}>
                <div className="col">
                  <p className='m-0 app-patient-label'>{appointment.fname} {appointment.lname}</p>
                  <p className='m-0 app-patient-label-sub'>{appointment.service_name}</p>
                </div>
                <div className="col app-patient-info">
                  {appointment.time_}
                </div>
                <div className="col app-patient-info">
                  {appointment.date_}
                </div>
                <div className="col app-patient-info">
                  {appointment.phone}
                </div>
                <div className="col app-patient-info">
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
      {/* {showReschedule && (
        <div className="reschedule-overlay">
          <Reschedule onClose={() => setShowReschedule(false)} keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment}/>
        </div>
      )} */}

    {/* Show confirmation modal */}
    <AppointmentConfirmed open={showConfirm} close={()=>setShowConfirm(false)}  keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment}></AppointmentConfirmed>

    {/* Show cancelation modal */}
    <CancelAppointment open={showCancel} close={()=>setShowCancel(false)}  keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment}></CancelAppointment>

    {/* Show view modal */}
    <ViewAppointment open={showView} close={()=>setShowView(false)} keyOfSelectedAppointment={keyOfSelectedAppointment} appointments={appointment}></ViewAppointment>

    </div>
  );
}

export default isAuthenticated(AdminAppointment);
