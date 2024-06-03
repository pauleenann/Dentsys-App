import React, { useState, useEffect } from 'react';
import './AdminDash.css';
import logowhite from './../../Assets/logowhite.png';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';
import axios from 'axios';

const AdminDash = () => {
    const [totalPending, setTotalPending] = useState(0);
    const [totalCancelled, setTotalCancelled] = useState(0);
    const [recentVisits, setRecentVisits] = useState(0);
    const [totalUpcoming, setTotalUpcoming] = useState(0);
    const [appToday, setAppToday] = useState([]);



  useEffect(() => {
    getTotalPendingAppointments();
    getCancelledAppointments();
    getRecentAppointments();
    getUpcomingAppointments();
    getAppointmentsToday()
  }, []);

  const getTotalPendingAppointments = () => {
    axios.get('http://localhost:80/api2/?action=getPendingAppointments')
      .then(response => {
        setTotalPending(response.data.total_pending);
      })
      .catch(error => {
        console.error('Error fetching total pending appointments:', error);
      });
  };

  const getCancelledAppointments = () => {
    axios.get('http://localhost:80/api2/?action=getCancelledAppointments')
      .then(response => {
        setTotalCancelled(response.data.total_cancelled);
      })
      .catch(error => {
        console.error('Error fetching total cancelled appointments:', error);
      });
  };

  const getRecentAppointments = () => {
    axios.get('http://localhost:80/api2/?action=getRecentAppointments')
      .then(response => {
        setRecentVisits(response.data.recent_visits);
      })
      .catch(error => {
        console.error('Error fetching total cancelled appointments:', error);
      });
  };

  const getUpcomingAppointments = () => {
    axios.get('http://localhost:80/api2/?action=getUpcomingAppointments')
      .then(response => {
        setTotalUpcoming(response.data.total_upcoming);
      })
      .catch(error => {
        console.error('Error fetching total cancelled appointments:', error);
      });
  };

  const getAppointmentsToday = () => {
    axios.get('http://localhost:80/api2/?action=getAppointmentsToday')
      .then(response => {
        setAppToday(response.data);
      })
      .catch(error => {
        console.error('Error fetching total cancelled appointments:', error);
      });
  };

  console.log(appToday)
  

  console.log(totalUpcoming)
  
    return (
        <div className="wrapper">
            <AdminNavbar></AdminNavbar>
            <div id="content">
                <AdminInfo></AdminInfo>
                <h2 className='admin-info-dashtext'>Dashboard</h2>
                <div className="row admin-dash-cards">
                    <div className="col patients-today text-center dashboard-card">
                        <p className='m-0 dashcard-p'>
                            Patients<br/>today
                        </p>
                        <span className='total-patients-today total'>{totalUpcoming === 0 ? 0 : totalUpcoming}</span>
                    </div>
                    <div className="col pending-appointments text-center dashboard-card">
                        <p className='m-0 dashcard-p'>
                            Pending<br/>Appointments
                        </p>
                        <span className='total-pending-appoint total'>{totalPending}</span>
                    </div>
                    <div className="col cancelled-appointments text-center dashboard-card">
                        <p className='m-0 dashcard-p'>
                            Cancelled<br/>Appointments
                        </p>
                        <span className='total-cancelled-appoint total'>{totalCancelled}</span>
                    </div>
                    <div className="col recent-visits text-center dashboard-card">
                        <p className='m-0 dashcard-p'>
                            Recent<br/>Visits
                        </p>
                        <span className='total-recent-visits total'>{recentVisits}</span>
                    </div>
                    <div className="col earnings-today text-center dashboard-card">
                        <p className='m-0 dashcard-p'> 
                            Earnings<br/>Today
                        </p>
                        <p className='total'>
                        ₱<span className='total-earnings-today total'>0</span>
                        </p>
                    </div>
                </div>
                
              <div className="row mt-5 row2">
                {/* appointments today */}
               
                  <div className="col appointment-today-card">
                      <div>
                          <div className="appointments-today-header">
                              <p className='appointments-today-p'>Appointments Today</p>
                          </div>
                          {appToday.map((appointment, index) => {
                              return (
                                  <div className="appointment-list">
                                      <table className="table ">
                                          <thead>
                                              <tr>
                                                  <td className='no-bg-color app-list-th' scope="col">Name</td>
                                                  <td className='no-bg-color app-list-th' scope="col">Phone Number</td>
                                                  <td className='no-bg-color app-list-th' scope="col">Service</td>
                                                  <td className='no-bg-color app-list-th' scope="col">Time</td>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr>
                                                  <td className='no-bg-color app-today-info' scope="row">{appointment.fname} {appointment.lname}</td>
                                                  <td className='no-bg-color app-today-info'>{appointment.phone}</td>
                                                  <td className='no-bg-color app-today-info'>{appointment.service_}</td>
                                                  <td className='no-bg-color app-today-info'>{appointment.time_}</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              );
                          })}
                          {/* "Nothing follows" message */}
                          <div className="nothing text-center">
                              {appToday.length === 0 && "-- Nothing follows --"}
                          </div>
                      </div>
                  </div>
              

                    {/* upcoming appointments */}
                    <div className="col-4 up-app">
                        <p className='text-center text-light up-app-text '>Upcoming<br/>Appointment</p>
                        <div className="up-app-time ">
                            <p className='m-0 text-light up-app-label'>Time</p>
                            <p className='text-light up-app-info'>10:00 AM - 11:00 AM</p>
                        </div>
                        <div className="up-app-service">
                            <p className='m-0 text-light up-app-label '>Service</p>
                            <p className='text-light up-app-info'>Teeth Cleaning</p>
                        </div>
                        <div className="up-app-patient">
                            <p className='m-0 text-light up-app-label'>Patient Name</p>
                            <p className='text-light up-app-info'>Giolliana Plandez</p>
                        </div>
                        <div className="up-app-email">
                            <p className='m-0 text-light up-app-label'>Patient Email</p>
                            <p className='text-light up-app-info'>giolliana@gmail.com</p>
                        </div>
                        <div className="up-app-phone">
                            <p className='m-0 text-light up-app-label'>Patient Phone Number</p>
                            <p className='text-light up-app-info'>09212787283</p>
                        </div>
                        <div className="button-link">
                        <button type="" className="btn text-light up-app-button" >View Appointment</button>
                        <p className='text-light up-app-info up-app-link'>View more appoinments</p>
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
                                <td className='no-bg-color recent-visit-th'  scope="col">Amount Paid</td>
                                <td className='no-bg-color'  scope="col"></td>
                                </tr>
                            </thead>
                            <tbody className=''>
                                <tr>
                                <td className='no-bg-color recent-visit-info'scope="row">Giolliana Plandez</td>
                                <td className='no-bg-color recent-visit-info' >09212787283</td>
                                <td className='no-bg-color recent-visit-info' >Teeth Cleaning</td>
                                <td className='no-bg-color recent-visit-info' >10:00 AM - 11:00 AM</td>
                                <td className='no-bg-color recent-visit-info' >₱ <span>600</span></td>
                                <td className='no-bg-color ' ><button className='btn rv-button'>View</button></td>
                                </tr>
                            </tbody>
                            </table>
                            <div className="nothing2 text-center ">
                            -- Nothing follows --
                        </div>
                        </div>
                        </div>
                        <hr />
                        <div className="recent-visit-total-earnings">
                            <div className="rv-total">
                                <p className='rv-total-label'>Total earnings for today</p>
                                <p className='rv-total-amount'>₱ <span>600</span></p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
    );
}

export default AdminDash;
