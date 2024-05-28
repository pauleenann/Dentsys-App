import React, { useEffect } from 'react'
import './EditPatientInfo.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const EditPatientInfo = () => {
    const [loading, setLoading] = useState(false);
    const [patient, setPatient] = useState({
        action: 'addNewPatient',
        p_fname: '',
        p_lname: '',
        p_mname: '',
        p_ename: '',
        p_age: '',
        p_gender: '',
        p_email: '',
        p_phone: '',
    });

    const {id} = useParams();
    
    useEffect(()=>{
        getPatient();
    }, []);

    function getPatient() {
        axios.get(`http://localhost:80/api2/${id}/?action=getPatient`)
          .then(function(response) {
            console.log(response.data); 
              setPatient(response.data);
          
          })
    };

    const gender = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Non-binary', label: 'Non-binary' },
        { value: 'Prefer not to say', label: 'Prefer not to say' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({...patient,[name]: value});
    }

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await axios.put(`http://localhost:80/api2/${id}/?action=editPatient`, patient).finally(() => setLoading(false));
          // Uncomment the next line if you want to navigate after submission
          navigate(`/view-patient-info/${patient.id}`);
        } catch (err) {
          console.log(err);
        }
    };

    console.log(patient);

  return (
    <div className='wrapper'>
        <AdminNavbar />
        <div id="content">
            <AdminInfo />
            {/* go back button */}
            <div className="row">
                <Link to={`/view-patient-info/${patient.id}`}>
                    <div className="back-to-patients">
                        <p><i className="fa-solid fa-chevron-left"></i> <span>Go back</span></p>
                    </div>
                </Link>
            </div>

            {/* Header */}
            <div className="rol">
                <h1>Edit Patient Record</h1>
            </div>

            {/* form */}
            <div className="rol add-patient-container mt-4">
                <div className="col">
                    <h5 className='text-center mb-5 mt-4'>Patient Information</h5>
                    <form onSubmit={handleClick}>
                        <div className="row">
                            {/* fname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >First name </label>
                                <input type="text" className="form-control" name='p_fname' id='p_fname' value={patient.p_fname} onChange={handleChange} />
                            </div>

                            {/* lname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Last name </label>
                                <input type="text" className="form-control" name='p_lname' id='p_lname' value={patient.p_lname} onChange={handleChange} />
                            </div>

                            {/* mname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Middle name</label>
                                <input type="text" className="form-control" name='p_mname' id='p_mname' value={patient.p_mname}onChange={handleChange} />
                            </div>

                            {/* ename */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Extension name</label>
                                <input type="text" className="form-control" name='p_ename' id='p_ename' value={patient.p_ename}onChange={handleChange} />
                            </div>

                            {/* age */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Age </label>
                                <input type="text" className="form-control" name='p_age' id='p_age' value={patient.p_age} onChange={handleChange} />
                            </div>

                            {/* gender */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels">Gender</label>
                                <input type="text" className="form-control" name='p_gender' id='p_gender' value={patient.p_gender} onChange={handleChange}/>
                            </div>

                            {/* email */}
                            <div className="col-4 mb-3">
                                <label htmlFor="" className="form-label labels" >Email</label>
                                <input type="email" className="form-control" name='p_email' id='p_email' value={patient.p_email} onChange={handleChange} />
                            </div>

                            {/* phone */}
                            <div className="col-4 mb-3">
                                <label htmlFor="" className="form-label labels" >Phone number </label>
                                <input type="text" className="form-control" name='p_phone' id='p_phone' value={patient.p_phone} onChange={handleChange} />
                            </div>

                            <div className="col-12 text-center mt-3">
                                <button className='btn button-save-record'>Save</button>
                            </div>
                        </div>
                    </form>

                    <hr className='my-5'/>

                    {/* dental history text header */}
                    <div className="col ">
                        <h5 className='text-center mb-5 my-4'>Dental History</h5>
                    </div>

                    {/* table */}
                    <div className="col">
                    <table class="table ">
                            <thead>
                                <tr>
                                <td className='no-bg-color dhistory-list-th' scope="col">Date of Service</td>
                                <td className='no-bg-color dhistory-list-th'  scope="col">Dentist</td>
                                <td className='no-bg-color dhistory-list-th'  scope="col">Procedure</td>
                                <td className='no-bg-color '  scope="col"></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className=''>
                                <td className='no-bg-color dhistory-info pt-3'scope="row">0/0/0</td>
                                <td className='no-bg-color dhistory-info pt-3' >Dr. </td>
                                <td className='no-bg-color dhistory-info pt-3' >Teeth Cleaning</td>
                                <td className='no-bg-color app-today-info' ><Link to='/dental-history'>
                                <button className='btn button-view'>View</button></Link></td>
                                </tr>
                            </tbody>
                            </table>
                    </div>

                </div>
            </div>
        </div>
        {loading && (
          <div className="spinner-overlay">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          
        )}
    </div>
  )
}

export default EditPatientInfo;
