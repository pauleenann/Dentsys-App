import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AddAppointment.css'
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import AdminInfo from "../AdminInfo/AdminInfo";


const AddAppointment = () => {
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
          navigate('/appointment-list');
        } catch (err) {
          console.log(err);
        //   setError(true)
        }
        
      };

    console.log(formData);

  return (
    <div className='wrapper'>
        <AdminNavbar />
        <div id="content">
            <AdminInfo />
            {/* go back button */}
            <div className="row">
                <Link to='/appointment-list'>
                    <div className="back-to-patients">
                        <p><i className="fa-solid fa-chevron-left"></i> <span>Go back</span></p>
                    </div>
                </Link>
            </div>

            {/* Header */}
            <div className="rol">
                <h1>Add an Appointment</h1>
            </div>

            {/* form */}
            <div className='appointment2-container container'>
        <form action="" className='form2'>
        <div className="row appointment2-row">
            <div className="col-xl-6 col-sm-12 patient2-info">
                <h5 className='text-center mb-5 accordion patient-info-text'>Patient Information</h5>
                <div className="row">
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-label labels" >First name <span className='required-field' >*</span></label>
                        <input type="text" className="form-control input-form" name='fname' id='fname' value={formData.fname} onChange={handleChange} required/>
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-label labels">Last name <span className='required-field'>*</span></label>
                        <input type="text" className="form-control input-form" name='lname' id='lname' value={formData.lname} onChange={handleChange} required/>
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-label labels">Middle name </label>
                        <input type="text" className="form-control input-form" name='mname' id='mname' value={formData.mname} onChange={handleChange}/>
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-label labels">Extension  name </label>
                        <input type="text" className="form-control input-form" name='ename' id='ename' value={formData.ename} onChange={handleChange}/>
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-label labels">Email <span className='required-field'>*</span></label>
                        <input type="text" className="form-control" name='email' id='email' value={formData.email} onChange={handleChange} required/>
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-label labels">Phone <span className='required-field'>*</span></label>
                        <input type="text" className="form-control" name='phone' id='phone' value={formData.phone} onChange={handleChange} required/>
                    </div>
                    <hr className='my-5'/>
                    <h5 className='text-center mb-5 labels'>Appointment Information</h5>
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-lavel labels">Type of Service</label>
                        <select class="form-select" aria-label="Default select example" id="service" name="service_" value={formData.service_} onChange={handleChange}>
                            <option value="" labels>Select a Service</option>
                                    {services.map((service, key) => (
                                        <option key={service.service_id} value={service.service_name}>{service.service_name}</option>
                                    ))}
                        </select>
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="labels p-0" >Date</label>
                        <input  type="date" id="date" name="date_" className="form-control labels" value={formData.date_} onChange={handleChange} />
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="" className="form-label labels" >Time</label>
                    <div className="row">
                        <div className="col-3 mb-3">
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
                        <div className="col-3 mb-3">
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
                <div className="col text-center">
                    <button className="add-app-button mt-5" onClick={handleClick}>Add Appointment</button>
                </div>
                
            </div>
        </div>
        </form>
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

export default AddAppointment
