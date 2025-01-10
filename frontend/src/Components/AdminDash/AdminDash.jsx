import React, { useState, useEffect } from 'react';
import './AdminDash.css';
import logowhite from './../../Assets/logowhite.png';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';
import axios from 'axios';
import isAuthenticated from '../Auth';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server

const AdminDash = () => {
    //usestates for total num of pending, cancelled, recent, and upcoming appointments
    //usestate for appointment today
    const [totalPending, setTotalPending] = useState(0);
    const [totalCancelled, setTotalCancelled] = useState(0);
    const [totalRecentVisits, setTotalRecentVisits] = useState(0);
    const [recentAppDetail, setRecentAppDetail] = useState([]);
    const [totalUpcoming, setTotalUpcoming] = useState(0);
    const [earningsToday, setEarningsToday] = useState(0);
    const [appToday, setAppToday] = useState([]);
    const [appointment, setAppointment] = useState([]);

    const navigate = useNavigate();

  //loads when component renders
  useEffect(() => {
    getTotalPendingAppointments();
    getTotalUpcomingAppointments();
    getTotalCancelledAppointments();
    getTotalRecentVisits();
    getAppointmentsToday();
    getRecentAppointmentDetails();
    getEarningsToday();
    getUnavailableTime()

    //Listen for the 'updateData' event from the server
   socket.on('updatedData', ()=>{
    getTotalPendingAppointments();
    getTotalUpcomingAppointments();
    getTotalCancelledAppointments();
    getTotalRecentVisits();
    getAppointmentsToday();
    getRecentAppointmentDetails();
    getEarningsToday();
    getUnavailableTime()
    console.log('updated data');}); // Fetch updated appointments when event is emitted

   // Cleanup the event listener when the component unmounts
   return () => {
     socket.off('updatedData');
   };
  },[]);

  const getUnavailableTime = () => {
    axios.get('https://prodbackenddentsys.tuplrc-cla.com/?action=getUnavailableTime')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching total pending appointments:', error);
      });
  };

  // retrieve total number of pending appointments
  const getTotalPendingAppointments = () => {
    axios.get('https://prodbackenddentsys.tuplrc-cla.com/?action=getPendingAppointments')
      .then(response => {
        setTotalPending(response.data.total_pending);
      })
      .catch(error => {
        console.error('Error fetching total pending appointments:', error);
      });
  };

  //retrieve total number of upcoming appointments
  const getTotalUpcomingAppointments = () => {
    axios.get('https://prodbackenddentsys.tuplrc-cla.com/?action=getUpcomingAppointments')
      .then(response => {
        setTotalUpcoming(response.data.total_upcoming);
      })
      .catch(error => {
        console.error('Error fetching total cancelled appointments:', error);
      });
  };

  //retrieve total number of cancelled appointments
  const getTotalCancelledAppointments = () => {
    axios.get('https://prodbackenddentsys.tuplrc-cla.com/?action=getCancelledAppointments')
      .then(response => {
        setTotalCancelled(response.data.total_cancelled);
      })
      .catch(error => {
        console.error('Error fetching total cancelled appointments:', error);
      });
  };

  //retrieve total number of recent visits
  const getTotalRecentVisits= () => {
    axios.get('https://prodbackenddentsys.tuplrc-cla.com/?action=getRecentAppointments')
      .then(response => {
        setTotalRecentVisits(response.data.recent_visits);
      })
      .catch(error => {
        console.error('Error fetching total cancelled appointments:', error);
      });
  };

  // retrieve earnings today
  const getEarningsToday = () => {
    axios.get('https://prodbackenddentsys.tuplrc-cla.com/?action=getEarningsToday')
      .then(response => {
        setEarningsToday(response.data.total_earnings);
      })
      .catch(error => {
        console.error('Error fetching total cancelled appointments:', error);
      });
  };

  // retrieve appointments today
  const getAppointmentsToday = () => {
    axios.get('https://prodbackenddentsys.tuplrc-cla.com/?action=getAppointmentsToday')
      .then(response => {
        setAppToday(response.data);
      })
      .catch(error => {
        console.error('Error fetching total cancelled appointments:', error);
      });
  };

  const getRecentAppointmentDetails = () => {
    axios.get('https://prodbackenddentsys.tuplrc-cla.com/?action=getRecentAppointmentDetails')
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
            setRecentAppDetail(response.data);
        } else {
          console.error('Data is not an array:', response.data);
          setRecentAppDetail([]);
        }
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
        setRecentAppDetail([]);
      });
  };
  
    return (
        <div className="admindash-container">
            <AdminNavbar></AdminNavbar>
            <div className="content">
                <AdminInfo></AdminInfo>
                <h2 className='admin-info-dashtext'>Dashboard</h2>
                <div className="row admin-dash-cards">
                  <Link to="/appointment-list/?filter=today" className='col patients-today text-center dashboard-card'>
                    <div className="">
                          <p className='m-0 dashcard-p'>
                              Patients<br/>today
                          </p>
                          <span className='total-patients-today total'>{totalUpcoming === 0 ? 0 : totalUpcoming}</span>
                    </div>
                  </Link>
                  <Link to="/appointment-list/?filter=pending" className="col pending-appointments text-center dashboard-card">
                    <div >
                          <p className='m-0 dashcard-p'>
                              Pending<br/>Appointments
                          </p>
                          <span className='total-pending-appoint total'>{totalPending}</span>
                    </div>
                  </Link>
                  <Link to="/appointment-list/?filter=cancelled" className="col cancelled-appointments text-center dashboard-card">
                    <div >
                        <p className='m-0 dashcard-p'>
                            Cancelled<br/>Appointments
                        </p>
                        <span className='total-cancelled-appoint total'>{totalCancelled}</span>
                    </div>
                  </Link>
                  <Link to="/appointment-list/?filter=recent" className="col recent-visits text-center dashboard-card">
                    <div >
                          <p className='m-0 dashcard-p'>
                              Recent<br/>Visits
                          </p>
                          <span className='total-recent-visits total'>{totalRecentVisits}</span>
                      </div>
                  </Link>
                  <Link to='/invoice-list' className="col earnings-today text-center dashboard-card">
                    <div >
                          <p className='m-0 dashcard-p'> 
                              Earnings<br/>Today
                          </p>
                          <p className='total'>
                          ₱<span className='total-earnings-today total'>{earningsToday}</span>
                          </p>
                      </div>
                  </Link>
                </div>
                
                <div className="row mt-3 row2">
              {/* appointments today */}
              <div className="col appointment-today-card">
                  <div>
                      <div className="appointments-today-header">
                          <p className='appointments-today-p'>Appointments Today</p>
                      </div>
                      {appToday.length > 0  ? (
                          <div className="appointment-list">
                              <table className="table">
                                  <thead>
                                      <tr>
                                          <td className='no-bg-color app-list-th' scope="col">Name</td>
                                          <td className='no-bg-color app-list-th' scope="col">Phone Number</td>
                                          <td className='no-bg-color app-list-th' scope="col">Service</td>
                                          <td className='no-bg-color app-list-th' scope="col">Time</td>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {appToday.map((appointment, index) => (
                                          <tr key={index}>
                                              <td className='no-bg-color app-today-info text-capitalize' scope="row">{appointment.fname} {appointment.lname}</td>
                                              <td className='no-bg-color app-today-info'>{appointment.phone}</td>
                                              <td className='no-bg-color app-today-info'>{appointment.service_name}</td>
                                              <td className='no-bg-color app-today-info'>{appointment.time_}</td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      ) : (
                          <div className="nothing text-center">
                              -- Nothing follows --
                          </div>
                      )}
                  </div>
              </div>

              {/* upcoming appointments */}
              <div className="col-4 up-app">
                  <p className='text-center text-light up-app-text '>Upcoming<br/>Appointment</p>
                  <div className="up-app-time ">
                      <p className='m-0 text-light up-app-label'>Time</p>
                      <p className='text-light up-app-info'>{appToday.length == 0 ? "":appToday[0].time_}</p>
                  </div>
                  <div className="up-app-service">
                      <p className='m-0 text-light up-app-label '>Service</p>
                      <p className='text-light up-app-info'>{appToday.length == 0 ? "":appToday[0].service_name}</p>
                  </div>
                  <div className="up-app-patient">
                      <p className='m-0 text-light up-app-label'>Patient Name</p>
                      <p className='text-light up-app-info text-capitalize'>{appToday.length == 0 ? "":`${appToday[0].fname} ${appToday[0].lname}`}</p>
                  </div>
                  <div className="up-app-email">
                      <p className='m-0 text-light up-app-label'>Patient Email</p>
                      <p className='text-light up-app-info'>{appToday.length == 0 ? "":appToday[0].email}</p>
                  </div>
                  <div className="up-app-phone">
                      <p className='m-0 text-light up-app-label'>Patient Phone Number</p>
                      <p className='text-light up-app-info'>{appToday.length == 0 ? "":appToday[0].phone}</p>
                  </div>
                  <div className="button-link">
                      {/* <button type="" className="btn text-light up-app-button" >View Appointment</button> */}
                      <Link to='/appointment-list'><p className='text-light up-app-info up-app-link'>View more appointments</p></Link>
                      
                  </div>
              </div>
          </div>
                <div className="row row3">
                  <div className="col-12 recent-visits-card">
                        <div>
                        <div className="">
                            <p className='recent-visit-header'>Recent Visits</p>
                        </div>
                        <div className="">
                        <table className="table ">
                            <thead>
                                <tr>
                                <td className='no-bg-color recent-visit-th' scope="col ">Name</td>
                                <td className='no-bg-color recent-visit-th'  scope="col">Phone Number</td>
                                <td className='no-bg-color recent-visit-th'  scope="col">Service</td>
                                <td className='no-bg-color recent-visit-th'  scope="col">Time</td>
                                {/* <td className='no-bg-color recent-visit-th'  scope="col">Amount Paid</td> */}
                                <td className='no-bg-color'  scope="col"></td>
                                </tr>
                            </thead>
                            {recentAppDetail.map((item,key)=>(
                                <tbody className=''>
                                <tr>
                                <td className='no-bg-color recent-visit-info'scope="row">{`${item.fname} ${item.lname}`}</td>
                                <td className='no-bg-color recent-visit-info' >{item.phone}</td>
                                <td className='no-bg-color recent-visit-info' >{item.service_name}</td>
                                <td className='no-bg-color recent-visit-info' >{item.time_}</td>
                                <td className='no-bg-color recent-visit-info' ></td>
                                {/* <td className='no-bg-color ' ><button className='btn rv-button'>View</button></td> */}
                                </tr>
                            </tbody>
                            ))}
                            
                            </table>
                            <div className="nothing2 text-center ">
                            -- Nothing follows --
                        </div>
                        </div>
                        </div>
                        {/* <hr />
                        <div className="recent-visit-total-earnings">
                            <div className="rv-total">
                                <p className='rv-total-label'>Total earnings for today</p>
                                <p className='rv-total-amount'></p>
                            </div>
                        </div> */}
                        
                    </div>
                </div>
            </div>
            </div>
    );
}

export default AdminDash;
