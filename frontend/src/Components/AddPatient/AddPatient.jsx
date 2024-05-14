import React from 'react'
import './AddPatient.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddPatient = () => {

    

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        mname: '',
        ename: '',
        email: '',
        phone: '',
        service_: '',
        date_: '',
        time_: ''
    });

    const services = [
        { value: 'Oral prophylaxis (Teeth Cleaning)', label: 'Oral prophylaxis (Teeth Cleaning)' },
        { value: 'Composite Restoration', label: 'Composite Restoration' },
        { value: 'Teeth Whitening', label: 'Teeth Whitening' },
        { value: 'Veneers', label: 'Veneers' },
        { value: 'Dental Crowns', label: 'Dental Crowns' },
        { value: 'Dental Bridges', label: 'Dental Bridges' },
        { value: 'Dental Implants', label: 'Dental Implants' },
        { value: 'Orthodontic Treatment (Braces)', label: 'Dental Implants' },
        { value: 'Oral Surgeries', label: 'Oral Surgeries' },
        { value: 'Root Canal Treats', label: 'Root Canal Treats' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:80/api2/user/save", formData);
          navigate("/appointment-request-submitted", {state: formData});
        } catch (err) {
          console.log(err);
        //   setError(true)
        }
      };

    console.log(formData);

  return (
    <div className='wrapper'>
        <AdminNavbar></AdminNavbar>
      <div id="content">
        <AdminInfo></AdminInfo>

        {/* go back button */}
        <div className="row">
            <Link to='/patient-list'>
            <div className="back-to-patients">
                <p><i class="fa-solid fa-chevron-right chevron"></i> <span>Go back</span></p>
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
                
                <div className="row">
                    {/* fname */}
                    <div className="col-4 mb-4">
                        <label htmlFor="" className="form-label labels" >First name <span className='required-field' >*</span></label>
                        <input type="text" className="form-control " name='fname' id='fname' required/>
                    </div>

                    {/* lname */}
                    <div className="col-4 mb-4">
                        <label htmlFor="" className="form-label labels" >Last name <span className='required-field' >*</span></label>
                        <input type="text" className="form-control " name='fname' id='fname' required/>
                    </div>

                    {/* mname */}
                    <div className="col-4 mb-4">
                        <label htmlFor="" className="form-label labels" >Middle name</label>
                        <input type="text" className="form-control " name='fname' id='fname'/>
                    </div>

                    {/* ename */}
                    <div className="col-4 mb-4">
                        <label htmlFor="" className="form-label labels" >Extension name</label>
                        <input type="text" className="form-control " name='fname' id='fname'/>
                    </div>

                    {/* age */}
                    <div className="col-4 mb-4">
                        <label htmlFor="" className="form-label labels" >Age <span className='required-field' >*</span></label>
                        <input type="text" className="form-control " name='fname' id='fname'/>
                    </div>

                    {/* gender */}
                    <div className="col-4 mb-4">
                        <label htmlFor="" className="form-lavel labels">Gender</label>
                        <select class="form-select" aria-label="Default select example" id="service" name="service_" >
                            <option value="" labels>Male</option>
                                    {/* {services.map((service) => (
                                        <option key={service.value} value={service.value}>{service.label}</option>
                                    ))} */}
                        </select>
                    </div>

                    {/* email */}
                    <div className="col-4 mb-5">
                        <label htmlFor="" className="form-label labels" >Email <span className='required-field' >*</span></label>
                        <input type="text" className="form-control " name='fname' id='fname'/>
                    </div>

                    {/* phone */}
                    <div className="col-4 mb-5">
                        <label htmlFor="" className="form-label labels" >Phone number <span className='required-field' >*</span></label>
                        <input type="text" className="form-control " name='fname' id='fname'/>
                    </div>

                    <hr />

                    {/* date */}
                    <div className="col-4 mb-5 mt-5 ">
                        <label htmlFor="" className="form-label labels" >Date</label>
                        <input  type="date" id="date" name="date_" className="form-control labels" />
                    </div>

                    {/* time */}
                    <div className="col-6 mt-5 mb-3">
                    <label htmlFor="" className="form-label labels" >Time</label>
                    <div className="row">
                        <div className="col-xl-6 col-sm-12 mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="9-10am" value="9:00 AM - 10:00 AM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault1">
                            9:00 AM - 10:00 AM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="10-11am" value="10:00 AM - 11:00 AM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            10:00 AM - 11:00 AM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="11-12am" value="11:00 AM - 12:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            11:00 AM - 12:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="12-1pm" value="12:00 PM - 1:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            12:00 PM - 1:00 PM
                            </label>
                            </div>
                        </div>
                        <div className="col-xl-6 col-sm-12 mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="1-2pm" value="1:00 PM - 2:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault1">
                            1:00 PM - 2:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="2-3pm" value="2:00 PM - 3:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            2:00 PM - 3:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="3-4pm" value="3:00 PM - 4:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            3:00 PM - 4:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="4-5pm" value="4:00 PM - 5:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            4:00 PM - 5:00 PM
                            </label>
                            </div>
                        </div>
                    </div>
                </div>
                
        

                    {/* services */}
                    <div className="col-4 mb-5">
                        <label htmlFor="" className="form-lavel labels mb-2">Type of Service</label>
                        <select class="form-select" aria-label="Default select example" id="service" name="service_" value={formData.service_} onChange={handleChange}>
                            <option value="" labels>Select a Service</option>
                                    {services.map((service) => (
                                        <option key={service.value} value={service.value}>{service.label}</option>
                                    ))}
                        </select>
                    </div>

                    {/* tooth num */}
                    <div className="col-4 mb-5">
                        <label htmlFor="" className="form-label labels" >Tooth Number </label>
                        <input type="text" className="form-control " name='fname' id='fname'/>
                    </div>
                </div>

                {/* tooth chart */}
                <div className="row">
                    {/* 16-9  and 17-24*/}
                    <div className="col-6">
                        {/* 16-9 */}
                        <div className="row">
                            <div className="col">
                                16
                                
                            </div>
                            <div className="col">
                                15
                                
                            </div>
                            <div className="col">
                                14
                                
                            </div>
                            <div className="col">
                                13
                                
                            </div>
                            <div className="col">
                                12
                                
                            </div>
                            <div className="col">
                                11
                                
                            </div>
                            <div className="col">
                                10
                                
                            </div>
                            <div className="col">
                                9
                            </div>
                        </div>
                        {/* 17-24 */}
                        <div className="row">
                            <div className="col">
                                17
                                
                            </div>
                            <div className="col">
                                18
                                
                            </div>
                            <div className="col">
                                19
                                
                            </div>
                            <div className="col">
                                20
                                
                            </div>
                            <div className="col">
                                21
                                
                            </div>
                            <div className="col">
                                22
                                
                            </div>
                            <div className="col">
                                23
                                
                            </div>
                            <div className="col">
                                24
                            </div>
                        </div>
                    </div>
                    {/* 8-1  and 25-32*/}
                    <div className="col-6">
                        {/* 8-1 */}
                        <div className="row">
                            <div className="col">
                                8
                                
                            </div>
                            <div className="col">
                                    7
                                
                            </div>
                            <div className="col">
                                6
                                
                            </div>
                            <div className="col">
                                5
                                
                            </div>
                            <div className="col">
                                4
                                
                            </div>
                            <div className="col">
                                3
                                
                            </div>
                            <div className="col">
                                2
                                
                            </div>
                            <div className="col">
                                1
                            </div>
                        </div>
                        {/* 25-32 */}
                        <div className="row">
                            <div className="col">
                                25
                                
                            </div>
                            <div className="col">
                                26
                                
                            </div>
                            <div className="col">
                                27
                                
                            </div>
                            <div className="col">
                                28
                                
                            </div>
                            <div className="col">
                                29
                                
                            </div>
                            <div className="col">
                                30
                                
                            </div>
                            <div className="col">
                                31
                                
                            </div>
                            <div className="col">
                                32
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
                    <select class="form-select" aria-label="Default select example" id="service" name="service_" value={formData.service_} onChange={handleChange}>
                        <option value="" labels>Select a Service</option>
                                {services.map((service) => (
                                            <option key={service.value} value={service.value}>{service.label}</option>
                                        ))}
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
                                    <li>Tooth Filling <ul>
                                        <li>Tooth No.: <span>17, 18, 19</span></li></ul></li>
                                </ul>
                            </div>
                            {/* receipt cost */}
                            <div className="receipt-cost">
                                <p>₱ <span>1,500.00</span></p>
                            </div>
                        </div>
                        {/* total */}
                        <div className="receipt-total">
                            <div>

                            </div>
                            <div className="receipt-total-amount">
                                <h6 className='m-0'>Total Due</h6>
                                <p className='m-0'>₱ <span>1,500.00</span></p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>


            <h5 className='mb-4 mt-5'>Payment</h5>

            
            {/* row for payment */}
            <div className="row">
                {/* payement method */}
                <div className="col-4">
                    <label htmlFor="" className="form-lavel labels mb-2">Payment Method</label>
                    <select class="form-select" aria-label="Default select example" id="service" name="service_" value={formData.service_} onChange={handleChange}>
                        <option value="" labels>CASH</option>
                                    {services.map((service) => (
                                        <option key={service.value} value={service.value}>{service.label}</option>
                                    ))}
                    </select>
                </div>
                {/* paid amount */}
                <div className="col-4">
                    <label htmlFor="" className="form-label labels" >Paid Amount</label>
                    <input type="text" className="form-control " name='fname' id='fname'/>
                </div>
            </div>
            {/* end of payment row */}

            {/* total paid */}
            <div className="row text-end">
                <div className="col total-paid mb-2">
                    <h6>Total Paid</h6>
                    <p className='m-0'>₱ <span>1,500.00</span></p>
                </div>
                <hr />
            </div>

            <div className="row text-end">
                <div className="col balance mb-3">
                    <h6 className='balance-text'>Balance</h6>
                    <p className='m-0 balance-text'>₱ <span className='balance-text'>0.00</span></p>
                </div>
            </div>

            {/* button */}
            <div className="text-center">
                <button className='btn save-patient-button'>Save</button>
            </div>




        </div>

      </div>
    </div>
  )
}

export default AddPatient
