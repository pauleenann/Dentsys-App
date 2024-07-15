import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AppointmentForm.css'


const AppointmentForm = () => {
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);

    useEffect(() => {
        getServices();
    }, []);


    async function getServices() {
        try {
            const response = await axios.get('http://localhost:80/api2/?action=getServices');
            console.log('Full API response:', response);
            console.log('API response data:', response.data);

            if (Array.isArray(response.data)) {
                setServices(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setServices([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setServices([]);
        }
    }
    

    const [formData, setFormData] = useState({
        action: 'addAppointment',
        fname: '',
        lname: '',
        mname: '',
        ename: '',
        email: '',
        phone: '',
        service_: '',
        date_: '',
        time_: '',
        status_: 'pending'
    });


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
        setLoading(true);
        try {
          await axios.post("http://localhost:80/api2/user/save", formData).finally(() => setLoading(false));
          navigate("/appointment-request-submitted", {state: formData});
        } catch (err) {
          console.log(err);
        //   setError(true)
        }
        
      };

    console.log(formData);

  return (
    <div className='appoinment-container container'>
        <h1 className='pt-5'>Appoinment Booking</h1>
        <form action="" className='form'>
        <div className="row appointment-row">
            <div className="col-xl-6 col-sm-12 patient-info">
                <h5 className='text-center mb-5 accordion patient-info-text'>Patient Information</h5>
                <div className="row">
                    <div className="col-12 mb-3">
                        <label htmlFor="" className="form-label labels" >First name <span className='required-field' >*</span></label>
                        <input type="text" className="form-control input-form" name='fname' id='fname' value={formData.fname} onChange={handleChange} required/>
                        <p className="error-message">Please input your first name</p>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="" className="form-label labels">Last name <span className='required-field'>*</span></label>
                        <input type="text" className="form-control input-form" name='lname' id='lname' value={formData.lname} onChange={handleChange} required/>
                        <p className="error-message">Please input your last name</p>
                    </div>
                    <div className="col-xl-6 col-sm-12 mb-3">
                        <label htmlFor="" className="form-label labels">Middle name </label>
                        <input type="text" className="form-control input-form" name='mname' id='mname' value={formData.mname} onChange={handleChange}/>
                    </div>
                    <div className="col-xl-6 col-sm-12 mb-3">
                        <label htmlFor="" className="form-label labels">Extension  name </label>
                        <input type="text" className="form-control input-form" name='ename' id='ename' value={formData.ename} onChange={handleChange}/>
                    </div>
                    <div className="col-xl-6 col-sm-12 mb-3">
                        <label htmlFor="" className="form-label labels">Email <span className='required-field'>*</span></label>
                        <input type="text" className="form-control" name='email' id='email' value={formData.email} onChange={handleChange} required/>
                        <p className="error-message">Please input your email</p>
                    </div>
                    <div className="col-xl-6 col-sm-12 mb-3">
                        <label htmlFor="" className="form-label labels">Phone <span className='required-field'>*</span></label>
                        <input type="text" className="form-control" name='phone' id='phone' value={formData.phone} onChange={handleChange} required/>
                        <p className="error-message">Please input your first name</p>
                    </div>
                    <hr className='my-5'/>
                    <h5 className='text-center mb-5 labels'>Appointment Information</h5>
                    <div className="col-12 mb-3">
                        <label htmlFor="" className="form-lavel labels">Type of Service <span className='required-field'>*</span></label>
                        <select class="form-select" aria-label="Default select example" id="service" name="service_" value={formData.service_} onChange={handleChange} required>
                            <option value="" labels>Select a Service</option>
                                    {services.map((service, key) => (
                                        <option key={service.service_id} value={service.service_name}>{service.service_name}</option>
                                    ))}
                        </select>
                        <p className="error-message">Please select a service</p>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="" className="form-label labels" >Date <span className='required-field'>*</span></label>
                        <input  type="date" id="date" name="date_" className="form-control labels" value={formData.date_} onChange={handleChange} required/>
                        <p className="error-message">Please choose a date</p>
                    </div>
                </div>
                
                {/* time form */}
                <div className="col">
                    <label htmlFor="" className="form-label labels" >Time <span className='required-field'>*</span></label>
                    <div className="row">
                        <div className="col-xl-6 col-sm-12 mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="time_" id="9-10am" value="9:00 AM - 10:00 AM" onChange={handleChange} required/>
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
                        <p className="error-message">Please choose the time</p>
                    </div>
                </div>
                
            </div>
            <div className="col-xl-6 col-sm-12 p-0">
                <div className="summary appointment-summary">
                    <h3 className='text-center mb-4 labels'>Appointment Summary</h3>
                    <div className="row">
                        <div className="col-4 mb-3 d-flex align-items-center labels">
                            Client name:
                        </div>
                        <div className="col-8 mb-3 client labels">
                            {formData.fname} {formData.mname} {formData.lname} {formData.ename}
                        </div>
                        <div className="col-4 mb-3 d-flex align-items-center labels">
                            Email:
                        </div>
                        <div className="col-8 mb-3 client labels-email">
                            {formData.email}
                        </div>
                        <div className="col-4 mb-3 d-flex align-items-center labels">
                            Phone no.:
                        </div>
                        <div className="col-8 mb-3 client labels">
                            {formData.phone}
                        </div>
                        <div className="col-4 mb-3 d-flex align-items-center labels">
                            Service Acquired:
                        </div>
                        <div className="col-8 mb-3 client labels">
                            {formData.service_}
                        </div>
                        <div className="col-4 mb-3 d-flex align-items-center labels">
                            Date:
                        </div>
                        <div className="col-8 mb-3 client labels">
                            {formData.date_}
                        </div>
                        <div className="col-4 mb-3 d-flex align-items-center labels">
                            Time:
                        </div>
                        <div className="col-8 mb-3 client labels">
                            {formData.time_}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn submit-button" id="submit" onClick={handleClick}>Submit</button>

                    </div>
                    
                    <p className='text-center
                    reminder'>Please check information before submitting</p>
                </div>
                

            </div>

        </div>
        </form>

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

export default AppointmentForm
