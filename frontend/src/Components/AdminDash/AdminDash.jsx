import React, { useState, useEffect, startTransition } from 'react';
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
    const [appointment, setAppointment] = useState([]);

    useEffect(() => {
        getAppointment();
      }, []);
    
      function getAppointment() {
        axios.get('http://localhost:80/api2/?action=getAppointmentsToday')
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

      console.log("today");
      console.log(appointment);


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:80/api2/?action=getAppointmentList');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStats();
    }, []);

  console.log(stats)
  
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
                        <span className='total-patients-today total'>{stats.total_today === 0 ? 0 : stats.total_today}</span>
                    </div>
                    <div className="col pending-appointments text-center dashboard-card">
                        <p className='m-0 dashcard-p'>
                            Pending<br/>Appointments
                        </p>
                        <span className='total-pending-appoint total'>{stats.total_pending}</span>
                    </div>
                    <div className="col cancelled-appointments text-center dashboard-card">
                        <p className='m-0 dashcard-p'>
                            Cancelled<br/>Appointments
                        </p>
                        <span className='total-cancelled-appoint total'>{stats.total_cancelled}</span>
                    </div>
                    <div className="col recent-visits text-center dashboard-card">
                        <p className='m-0 dashcard-p'>
                            Recent<br/>Visits
                        </p>
                        <span className='total-recent-visits total'>{stats.recent_visit}</span>
                    </div>
                    <div className="col earnings-today text-center dashboard-card">
                        <p className='m-0 dashcard-p'> 
                            Earnings<br/>Today
                        </p>
                        <p className='total'>
                        ₱<span className='total-earnings-today total'>{stats.total_paid_today }</span>
                        </p>
                    </div>
                </div>

                {/* {appointment.mapP((appointment, index)=>{
                    return(

                    );
                })}; */}

                
                
                <div className="row row3">
                <div className="col recent-visits-card">
                        <div>
                        <div className="">
                            <p className='recent-visit-header'>Recent Visits</p>
                        </div>
                        <div className="">
                        <table class="table ">
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
