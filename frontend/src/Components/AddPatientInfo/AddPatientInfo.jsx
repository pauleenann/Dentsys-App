import React from 'react'
import './AddPatientInfo.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddPatientInfo = () => {

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
        p_date: '',
        p_time: '',
        p_service: '',
        p_selectedTeeth: {}, 
        p_dentist: '',
        p_payment: '',
        p_paidamount: ''
    });

    const services = [
        { value: 'Oral prophylaxis (Teeth Cleaning)', label: 'Oral prophylaxis (Teeth Cleaning)' },
        { value: 'Composite Restoration', label: 'Composite Restoration' },
        { value: 'Teeth Whitening', label: 'Teeth Whitening' },
        { value: 'Veneers', label: 'Veneers' },
        { value: 'Dental Crowns', label: 'Dental Crowns' },
        { value: 'Dental Bridges', label: 'Dental Bridges' },
        { value: 'Dental Implants', label: 'Dental Implants' },
        { value: 'Orthodontic Treatment (Braces)', label: 'Orthodontic Treatment (Braces)' },
        { value: 'Oral Surgeries', label: 'Oral Surgeries' },
        { value: 'Root Canal Treats', label: 'Root Canal Treats' }
    ];

    const dentist = [
        { value: 'Dr. Dingcong', label: 'Dr. Dingcong' },
        { value: 'Dr. Bernal', label: 'Dr. Bernal' },
    ];

    const payment = [
        { value: 'CASH', label: 'CASH' },
        { value: 'GCASH', label: 'GCASH' },
    ];

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
        try {
          await axios.post("http://localhost:80/api2/user/save", patient);
          // Uncomment the next line if you want to navigate after submission
          // navigate("/appointment-request-submitted", {state: patient});
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
                <Link to='/patient-list'>
                    <div className="back-to-patients">
                        <p><i className="fa-solid fa-chevron-left"></i> <span>Go back</span></p>
                    </div>
                </Link>
            </div>

            {/* Header */}
            <div className="rol">
                <h1>Add a New Patient</h1>
            </div>

            {/* form */}
            <div className="rol add-patient-container mt-4">
                <div className="col">
                    <h5 className='text-center mb-5 mt-4'>Patient Information</h5>
                    <form onSubmit={handleClick}>
                        <div className="row">
                            {/* fname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >First name <span className='required-field' >*</span></label>
                                <input type="text" className="form-control" name='p_fname' id='p_fname' value={patient.p_fname} onChange={handleChange} required />
                            </div>

                            {/* lname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Last name <span className='required-field'>*</span></label>
                                <input type="text" className="form-control" name='p_lname' id='p_lname' value={patient.p_lname} onChange={handleChange} required />
                            </div>

                            {/* mname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Middle name</label>
                                <input type="text" className="form-control" name='p_mname' id='p_mname' value={patient.p_mname} onChange={handleChange} />
                            </div>

                            {/* ename */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Extension name</label>
                                <input type="text" className="form-control" name='p_ename' id='p_ename' value={patient.p_ename} onChange={handleChange} />
                            </div>

                            {/* age */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Age <span className='required-field' >*</span></label>
                                <input type="text" className="form-control" name='p_age' id='p_age' value={patient.p_age} onChange={handleChange} />
                            </div>

                            {/* gender */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels">Gender</label>
                                <select className="form-select" aria-label="Default select example" id="p_gender" name="p_gender" value={patient.p_gender} onChange={handleChange}>
                                    <option value="" disabled>Select Gender</option>
                                    {gender.map((gender) => (
                                        <option key={gender.value} value={gender.value}>{gender.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* email */}
                            <div className="col-4 mb-5">
                                <label htmlFor="" className="form-label labels" >Email <span className='required-field' >*</span></label>
                                <input type="email" className="form-control" name='p_email' id='p_email' value={patient.p_email} onChange={handleChange} />
                            </div>

                            {/* phone */}
                            <div className="col-4 mb-5">
                                <label htmlFor="" className="form-label labels" >Phone number <span className='required-field' >*</span></label>
                                <input type="text" className="form-control" name='p_phone' id='p_phone' value={patient.p_phone} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-12 text-center"><button type="submit" className="btn button-save">Save</button></div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddPatientInfo;