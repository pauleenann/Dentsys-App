import React from 'react'
import './AddPatientInfo.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import isAuthenticated from '../Auth';


const AddPatientInfo = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false)
    const navigate = useNavigate();

    const [patient, setPatient] = useState({
        action: 'addNewPatient',
        p_fname: '',
        p_lname: '',
        p_mname: '',
        p_ename: '',
        p_age: '',
        p_gender: '',
        p_email: '',
        p_phone: ''
    });

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

    

    const handleClick = async (e) => {
        e.preventDefault();
        if(submitForm === false){
            formValidation();
        }else{
            setLoading(true);
            try {
            await axios.post("http://localhost:80/api2/user/save", patient).finally(() => setLoading(false));
            // Uncomment the next line if you want to navigate after submission
            navigate("/patient-list");
            } catch (err) {
            console.log(err);
            }
        }
        
    };

    const formValidation = ()=>{
        let error = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!patient.p_fname){
            error.fname = 'Please input the first name';
        }
        if(!patient.p_lname){
            error.lname = 'Please input the last name';
        }
        if(!patient.p_age){
            error.age = 'Please input the age';
        }
        if(!regex.test(patient.p_email)){
            error.email = 'Please input a valid email';
        }
        if(!patient.p_phone || patient.p_phone.length !== 11){
            error.phone = 'Please input a valid mobile phone number';
        }
        
        if(Object.keys(error).length == 0){
            setSubmitForm(true)
        }else{
            setSubmitForm(false)
        }

        setErrors(error)

       
    }

    console.log(patient);

  return (
    <div className='wrapper'>
        <AdminNavbar/>        
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
                                <input type="text" className="form-control" name='p_fname' id='p_fname' value={patient.p_fname} onChange={handleChange} onBlur={formValidation} required />
                                <p className="error-message">{errors.fname}</p>
                            </div>

                            {/* lname */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels" >Last name <span className='required-field'>*</span></label>
                                <input type="text" className="form-control" name='p_lname' id='p_lname' value={patient.p_lname} onChange={handleChange} onBlur={formValidation} required />
                                <p className="error-message">{errors.lname}</p>
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
                                <input type="text" className="form-control" name='p_age' id='p_age' value={patient.p_age} onChange={handleChange} onBlur={formValidation} />
                                <p className="error-message">{errors.age}</p>
                            </div>

                            {/* gender */}
                            <div className="col-4 mb-4">
                                <label htmlFor="" className="form-label labels">Gender</label>
                                <select className="form-select" aria-label="Default select example" id="p_gender" name="p_gender" value={patient.p_gender} onChange={handleChange} >
                                    <option value="" disabled>Select Gender</option>
                                    {gender.map((gender) => (
                                        <option key={gender.value} value={gender.value}>{gender.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* email */}
                            <div className="col-4 mb-5">
                                <label htmlFor="" className="form-label labels" >Email <span className='required-field' >*</span></label>
                                <input type="email" className="form-control" name='p_email' id='p_email' value={patient.p_email} onChange={handleChange} onBlur={formValidation}/>
                                <p className="error-message">{errors.email}</p>
                            </div>

                            {/* phone */}
                            <div className="col-4 mb-5">
                                <label htmlFor="" className="form-label labels" >Phone number <span className='required-field' >*</span></label>
                                <input type="text" className="form-control" name='p_phone' id='p_phone' value={patient.p_phone} onChange={handleChange} onBlur={formValidation}/>
                                <p className="error-message">{errors.phone}</p>
                            </div>
                        </div>
                        <div className="col-12 text-center"><button type="submit" className="btn button-save" onClick={handleClick}>Save</button></div>
                        
                    </form>
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

export default isAuthenticated(AddPatientInfo);
