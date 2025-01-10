import React, { useEffect } from 'react'
import './ViewPatientInfo.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DentalHistory from '../DentalHistory/DentalHistory';
import isAuthenticated from '../Auth';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server

const ViewPatientInfo = () => {
    const [patient, setPatient] = useState();
    const [history, setHistory] = useState();
    const navigate = useNavigate();

    const {id} = useParams();
    
    useEffect(()=>{
        getPatient();
        getProcedureHistory();

         //Listen for the 'updateData' event from the server
         socket.on('updatedData', ()=>{
            getProcedureHistory();
            console.log('updated data');
        }); // Fetch updated appointments when event is emitted

        // Cleanup the event listener when the component unmounts
        return () => {
            socket.off('updatedData');
        };
    }, []);

    const getPatient = async()=> {
        try{
            const response = await axios.get(`https://prodbackenddentsys.tuplrc-cla.com/${id}/?action=getPatient`);
            console.log(response)
            setPatient(response.data);
        }catch(err){
            console.log("Couldn't get patients. An error occurred: ", err.message)
        }
    };
    
    const getProcedureHistory = async ()=> {
        try{
            const response =await axios.get(`https://prodbackenddentsys.tuplrc-cla.com/${id}/?action=getProcedureHistory`);
            setHistory(response.data);
        }catch(err){
            console.log("Couldn't get dental history. An error occurred: ", err.message)
        }
    };

    console.log(patient)

  return (
    <div className='view-patient-container'>
        <AdminNavbar />
        <div className="content">
            <AdminInfo />
            {/* go back button */}
            <div className="row">
                <Link to='/patient-list' className='back'>
                    <i className="fa-solid fa-chevron-left mt-4"></i> <span>Go back</span>
                </Link>
            </div>

            {/* Header */}
            <h1 className='view-patient-title'>Patient Record</h1>
        

            {/* form */}
            <div className="row view-patient-form mt-3">
                <div className="col">
                    <h5 className='text-center mb-5 mt-4 view-patient-form-title'>Patient Information</h5>
                    <form>
                        <div className="row">
                            {/* fname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >First name </label>
                                <input type="text" className="form-control text-capitalize" name='p_fname' id='p_fname' value={patient?patient.p_fname:''}  readOnly/>
                            </div>

                            {/* lname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Last name </label>
                                <input type="text" className="form-control text-capitalize" name='p_lname' id='p_lname' value={patient?patient.p_lname:''} readOnly />
                            </div>

                            {/* mname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Middle name</label>
                                <input type="text" className="form-control text-capitalize" name='p_mname' id='p_mname' value={patient?patient.p_mname === '' ? 'n/a' : patient.p_mname:''} readOnly/>
                            </div>

                            {/* ename */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Extension name</label>
                                <input type="text" className="form-control text-capitalize" name='p_ename' id='p_ename' value={patient?patient.p_ename === '' ? 'n/a' : patient.p_ename:''} readOnly/>
                            </div>

                            {/* age */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Age </label>
                                <input type="text" className="form-control text-capitalize" name='p_age' id='p_age' value={patient?patient.p_age==null ? 'n/a' : patient.p_age:''}  readOnly/>
                            </div>

                            {/* gender */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels">Gender</label>
                                <input type="text" className="form-control text-capitalize" name='p_gender' id='p_gender' value={patient?patient.p_gender==null ? 'n/a' : patient.p_gender:''} readOnly/>
                            </div>

                            {/* email */}
                            <div className="col-4 mb-3">
                                <label htmlFor="" className="form-label labels" >Email</label>
                                <input type="email" className="form-control" name='p_email' id='p_email' value={patient?patient.p_email:''}  readOnly/>
                            </div>

                            {/* phone */}
                            <div className="col-4 mb-3">
                                <label htmlFor="" className="form-label labels" >Phone number </label>
                                <input type="text" className="form-control" name='p_phone' id='p_phone' value={patient?patient.p_phone:''}  readOnly/>
                            </div>

                            <div className="col-12 text-end">
                                <Link to={`/edit-patient-info/${patient?patient.id:''}`}><button className='btn edit-record'> Edit</button></Link>
                            </div>
                        </div>
                    </form>

                    <hr className='my-5'/>

                    {/* dental history text header */}
                    <div className="col ">
                        <h5 className='text-center mb-5 my-4 view-patient-form-title'>Dental History</h5>
                    </div>

                    {/* table */}
                    <div className="col">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Date of Service</th>
                                    <th scope="col">Dentist</th>
                                    <th scope="col">Procedure</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(history)? history.map((item, index) => (
                                        <tr className=''>
                                            <td scope="row">{item.p_date}</td>
                                            <td>Dr. {item.u_fname} {item.u_lname}</td>
                                            <td>{item.service_name}</td>
                                            <td>
                                            <Link to={`/dental-history/${item.id}`}><button className='btn button-view'>View</button>
                                            </Link></td>
                                        </tr>
                                    )
                                    ) : (
                                        <p className='my-3'>No history available.</p>   
                                    )}      
                            </tbody>   
                        </table>
                    </div>

                    {/* add service button */}
                    <div className="col-12 text-center">
                        <Link to={`/add-service/${id}`}>
                            <button className='btn add-service-btn'><i class="fa-regular fa-square-plus button-service-icon"></i>
                            <span> Add another procedure</span></button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default isAuthenticated(ViewPatientInfo);
