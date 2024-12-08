import React, { useEffect } from 'react'
import './AddDentalHistory.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import tooth1 from './../../Assets/Tooth/tooth1.png'
import tooth2 from './../../Assets/Tooth/tooth2.png'
import tooth3 from './../../Assets/Tooth/tooth3.png'
import tooth4 from './../../Assets/Tooth/tooth4.png'
import tooth5 from './../../Assets/Tooth/tooth5.png'
import tooth6 from './../../Assets/Tooth/tooth6.png'
import tooth7 from './../../Assets/Tooth/tooth7.png'
import tooth8 from './../../Assets/Tooth/tooth8.png'
import tooth9 from './../../Assets/Tooth/tooth9.png'
import tooth10 from './../../Assets/Tooth/tooth10.png'
import tooth11 from './../../Assets/Tooth/tooth11.png'
import tooth12 from './../../Assets/Tooth/tooth12.png'
import tooth13 from './../../Assets/Tooth/tooth13.png'
import tooth14 from './../../Assets/Tooth/tooth14.png'
import tooth15 from './../../Assets/Tooth/tooth15.png'
import tooth16 from './../../Assets/Tooth/tooth16.png'
import tooth17 from './../../Assets/Tooth/tooth17.png'
import tooth18 from './../../Assets/Tooth/tooth18.png'
import tooth19 from './../../Assets/Tooth/tooth19.png'
import tooth20 from './../../Assets/Tooth/tooth20.png'
import tooth21 from './../../Assets/Tooth/tooth21.png'
import tooth22 from './../../Assets/Tooth/tooth22.png'
import tooth23 from './../../Assets/Tooth/tooth23.png'
import tooth24 from './../../Assets/Tooth/tooth24.png'
import tooth25 from './../../Assets/Tooth/tooth25.png'
import tooth26 from './../../Assets/Tooth/tooth26.png'
import tooth27 from './../../Assets/Tooth/tooth27.png'
import tooth28 from './../../Assets/Tooth/tooth28.png'
import tooth29 from './../../Assets/Tooth/tooth29.png'
import tooth30 from './../../Assets/Tooth/tooth30.png'
import tooth31 from './../../Assets/Tooth/tooth31.png'
import tooth32 from './../../Assets/Tooth/tooth32.png'
import selected1 from './../../Assets/Tooth Selected/selected1.png'
import selected2 from './../../Assets/Tooth Selected/selected2.png'
import selected3 from './../../Assets/Tooth Selected/selected3.png'
import selected4 from './../../Assets/Tooth Selected/selected4.png'
import selected5 from './../../Assets/Tooth Selected/selected5.png'
import selected6 from './../../Assets/Tooth Selected/selected6.png'
import selected7 from './../../Assets/Tooth Selected/selected7.png'
import selected8 from './../../Assets/Tooth Selected/selected8.png'
import selected9 from './../../Assets/Tooth Selected/selected9.png'
import selected10 from './../../Assets/Tooth Selected/selected10.png'
import selected11 from './../../Assets/Tooth Selected/selected11.png'
import selected12 from './../../Assets/Tooth Selected/selected12.png'
import selected13 from './../../Assets/Tooth Selected/selected13.png'
import selected14 from './../../Assets/Tooth Selected/selected14.png'
import selected15 from './../../Assets/Tooth Selected/selected15.png'
import selected16 from './../../Assets/Tooth Selected/selected16.png'
import selected17 from './../../Assets/Tooth Selected/selected17.png'
import selected18 from './../../Assets/Tooth Selected/selected18.png'
import selected19 from './../../Assets/Tooth Selected/selected19.png'
import selected20 from './../../Assets/Tooth Selected/selected20.png'
import selected21 from './../../Assets/Tooth Selected/selected21.png'
import selected22 from './../../Assets/Tooth Selected/selected22.png'
import selected23 from './../../Assets/Tooth Selected/selected23.png'
import selected24 from './../../Assets/Tooth Selected/selected24.png'
import selected25 from './../../Assets/Tooth Selected/selected25.png'
import selected26 from './../../Assets/Tooth Selected/selected26.png'
import selected27 from './../../Assets/Tooth Selected/selected27.png'
import selected28 from './../../Assets/Tooth Selected/selected28.png'
import selected29 from './../../Assets/Tooth Selected/selected29.png'
import selected30 from './../../Assets/Tooth Selected/selected30.png'
import selected31 from './../../Assets/Tooth Selected/selected31.png'
import selected32 from './../../Assets/Tooth Selected/selected32.png'
import isAuthenticated from '../Auth';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server


const AddService = () => {
    const appointmentTime = [
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM",
        "1:00 PM - 2:00 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM",
        "4:00 PM - 5:00 PM"
    ]

  return (
    <div className='add-dental-history-container'>
        <AdminNavbar></AdminNavbar>
        <div className="content">
        <AdminInfo></AdminInfo>

        {/* go back button */}
        <div className="row">
            <Link to='/patient-list'>
            <div className="back-to-patients">
                <p><i class="fa-solid fa-chevron-left mt-4"></i> <span>Go back</span></p>
            </div>
            </Link>
        </div>

        {/* header */}
        <div className="row">
            <h1 className='add-service-title'>Add a new service</h1>
        </div>

        {/* form */}
        <div className="row add-patient-container mt-3">
            <div className="col">                
                <div className="row">
                    {/* date */}
                    <div className="col-4 mb-5 mt-5 ">
                        <label htmlFor="" className="form-label labels" >Date</label>
                        <input  type="date" id="p_date" name="p_date" className="form-control labels" v/>
                        <p className="error-message"></p>
                    </div>

                    {/* time */}
                    <div className="col-6 mt-5 mb-3">
                        <label htmlFor="" className="form-label labels" >Time</label>
                        <div className="row">
                            <div className="col-xl-6 col-sm-12 mb-3">
                                {appointmentTime.map((time,index)=>{
                                    if(index<=3){
                                        return <div class="form-check">
                                        <input class="form-check-input" type="radio" name="p_time" id="9-10am" value={time} />
                                        <label class="form-check-label time-text" for="flexRadioDefault1">
                                        {time}
                                        </label>
                                    </div>
                                    }
                                })}
                        </div>
                        <div className="col-xl-6 col-sm-12 mb-3">
                            {appointmentTime.map((time,index)=>{
                                if(index>3){
                                    return <div class="form-check">
                                        <input class="form-check-input" type="radio" name="p_time" id="9-10am" value={time} />
                                        <label class="form-check-label time-text" for="flexRadioDefault1">{time}</label>
                                    </div>
                                }
                            })}
                        </div>
                       
                    </div>
                </div>
                
                <div className="row">
                    {/* services */}
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-label labels mb-2">Type of Service</label>
                        <select class="form-select" aria-label="Default select example" id="p_service" name="p_service" >
                            <option value="" labels disabled>Select a Service</option>
                                    
                        </select>
                       
                    </div>

                    {/* service severity/material*/}
                    <div className="col-4">
                        <label htmlFor="" className="form-label labels mb-2">Level of Severity/Type of Material</label>
                        <select class="form-select" aria-label="Default select example" id="p_severity_material" name="p_severity_material" >
                            <option value="" labels disabled>Select a Severity/Material</option>
        
                        </select>
                    </div>
                    </div>
                    

                    {/* tooth num */}
                    <div className="col-4 mb-5">
                        <label htmlFor="" className="form-label labels" >Tooth Number </label>
                        <input type="text" className="form-control " name='toothNumber' id='toothNumber' />
                    </div>
                </div>

                
                {/* tooth chart */}
                <div className="tooth-chart">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                
                            </div>
                            <div className="row">
                                
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                               
                            </div>
                            <div className="row">
                              
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            {/* end of row for tooth chart */}


            {/* dentist */}
            <div className="row mt-5">
                <div className="col-6">
                    <label htmlFor="" className="form-lavel labels">Dentist</label>
                    <select class="form-select" aria-label="Default select example" id="p_dentist" name="p_dentist" >
                        <option value="" labels disabled>Select Dentist</option>
                            
                    </select>
                    
                </div>
            </div>

            {/* receipt */}
            <div className=" row mt-5 mb-5">
                <div className="col p-0">
                    <div className="receipt-container">
                        {/* receipt header */}
                        <div className="receipt-header">
                            <h6 className='m-0'>Procedure Description</h6>
                            <h6 className='m-0'>Cost</h6>
                        </div>
                        {/* receipt info */}
                        <div className="receipt-info">
                            {/* receipt procedure */}
                            <div className="receipt-procedure">
                                <ul>
                                    <li className='service-name'><ul>
                                    <li className='tooth-no'>Tooth No.: <span>
                                       
                                    </span></li></ul></li>
                                </ul>
                            </div>
                            {/* receipt cost */}
                            <div className="receipt-cost">
                                <p>₱ 
                                </p>
                            </div>
                        </div>
                        {/* total */}
                        <div className="receipt-total">
                            <div>

                            </div>
                            <div className="receipt-total-amount">
                                <h6 className='m-0'>Total Due</h6>
                                <p className='m-0'>₱ <span></span></p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* button */}
            <div className="text-center">
                <button className='btn save-patient-button' onClick>Save</button>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default isAuthenticated(AddService);
