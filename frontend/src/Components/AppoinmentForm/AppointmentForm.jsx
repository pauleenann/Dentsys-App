import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AppointmentForm.css'
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server

const AppointmentForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false)
    const [occupiedTime, setOccupiedTime] = useState([])
    const [minDate, setMinDate] = useState("");
    const loggedin = "patient"
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

    //everytime the chosen date changes, we need to reset the time
    useEffect(()=>{
        if(formData.date_.length!=0){
            getUnavailableTime(formData.date_)
        }

        setFormData((prevData)=>({
            ...prevData,
            time_:''
        }))
    },[formData.date_])

    useEffect(() => {
        getServices();
        // Calculate today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today); // Set the state for the minimum date
    }, []);

    const getUnavailableTime = (date) => {
        const times = []
        axios.get(`http://localhost:80/api2/${date}/?action=getUnavailableTime`)
          .then(response => {
            console.log(response.data)
            const results = response.data;
            if(results.length>0){
                results.forEach(result=>{
                    times.push(result.time_)
                })
            }
            setOccupiedTime(times);
          })
          .catch(error => {
            console.error('Error fetching total pending appointments:', error);
          });
      };

    const unavailableTime = (time)=>{
        //set inputted date as chosen date
        const chosenDate = formData.date_?formData.date_:'';

        //set time today as the hour in 24 hour format
        const timeToday = new Date().getHours();
        // console.log('hour today: ', timeToday)

        //get each hour sa options
        const splitTime = time.split(' ');
        const hour = parseInt(splitTime[0].split(':')[0]);//get the hour

        //if hour is greater than 12, add 12 to convert to 24 hour format
        const hour24Format = hour<5?hour+12:hour;
        // console.log('hour ',hour24Format);
      
        //logic: if hour24format (hour sa options) ay less than or equal doon sa current time AND yung piniling date ng user ay same sa date ngayon, return TRUE (ibig sabihin, disabled yung radio button na un)
        return hour24Format<=timeToday&&chosenDate==minDate;
    }

    const getServices = async ()=> {
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
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(submitForm)
        if(submitForm == false){
            formValidation();
        }else if(submitForm){
            console.log('form submitted')
            setLoading(true);
                    try {
                        const response = await axios.post("http://localhost:80/api2/user/save", {loggedin:loggedin, ...formData,}).finally(() => setLoading(false));
                        console.log(response.data.status)
                        //if may nainsert na data, send event sa server (node)
                        if(response.data.status==1){
                            socket.emit('newData');
                        }
                        navigate("/appointment-request-submitted",{
                            state:formData
                        });
                    } catch (err) {
                    console.log(err);
                    //   setError(true)
                    }
        }
      };

    const formValidation = ()=>{
        let error = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!formData.fname){
            error.fname = 'Please input your first name';
        }
        if(!formData.lname){
            error.lname = 'Please input your last name';
        }
        if(!regex.test(formData.email)){
            error.email = 'Please input a valid email';
        }
        if(!formData.phone || formData.phone.length !== 11){
            error.phone = 'Please input your mobile phone number';
        }
        if(!formData.service_){
            error.service = 'Please select a service';
        }
        if(!formData.date_){
            error.date = 'Please choose a date';
        }
        if(!formData.time_){
            error.time = 'Please choose the time';
        }
        if(Object.keys(error).length == 0){
            setSubmitForm(true)
        }else{
            setSubmitForm(false)
        }

        setErrors(error)
    }

    console.log(formData)

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
                        <input type="text" className="form-control input-form" name='fname' id='fname' value={formData.fname} onChange={handleChange} onBlur={formValidation}/>
                        <p className="error-message">{errors.fname}</p>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="" className="form-label labels">Last name <span className='required-field'>*</span></label>
                        <input type="text" className="form-control input-form" name='lname' id='lname' value={formData.lname} onChange={handleChange} onBlur={formValidation}/>
                        <p className="error-message">{errors.lname}</p>
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
                        <input type="text" className="form-control" name='email' id='email' value={formData.email} onChange={handleChange} onBlur={formValidation}/>
                        <p className="error-message">{errors.email}</p>
                    </div>
                    <div className="col-xl-6 col-sm-12 mb-3">
                        <label htmlFor="" className="form-label labels">Phone <span className='required-field'>*</span></label>
                        <input type="text" className="form-control" name='phone' id='phone' value={formData.phone} onChange={handleChange} onBlur={formValidation}/>
                        <p className="error-message">{errors.phone}</p>
                    </div>
                    <hr className='my-5'/>
                    <h5 className='text-center mb-5 labels'>Appointment Information</h5>
                    <div className="col-12 mb-3">
                        <label htmlFor="" className="form-lavel labels">Type of Service <span className='required-field'>*</span></label>
                        <select class="form-select" aria-label="Default select example" id="service" name="service_" value={formData.service_} onChange={handleChange} onBlur={formValidation}>
                            <option value="" labels disabled >Select a Service</option>
                                    {services.map((service, key) => (
                                        <option key={service.service_id} value={service.service_id}>{service.service_name}</option>
                                    ))}
                        </select>
                        <p className="error-message">{errors.service}</p>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="" className="form-label labels" >Date <span className='required-field'>*</span></label>
                        <input  type="date" id="date" name="date_" className="form-control labels" value={formData.date_} onChange={handleChange} onBlur={formValidation} min={minDate}/>
                        <p className="error-message">{errors.date}</p>
                    </div>
                </div>
                
                {/* time form */}
                <div className="col">
                    <label htmlFor="" className="form-label labels" >Time <span className='required-field'>*</span></label>
                    <div className="row">
                        <div className="col-xl-6 col-sm-12 mb-3">
                            {/* iterate appointment time array */}
                            {appointmentTime.map((time,index)=>{
                                // if yung index ay di pa umaaabot ng 4, display first 4 time in the first column
                                if(index<=3){
                                    return <div class="form-check">
                                    <input class="form-check-input" type="radio" name="time_" id="" value={time} onChange={handleChange} onBlur={formValidation} disabled={occupiedTime.includes(time)||unavailableTime(time)
                                    } checked={formData.time_===time}/>
                                    <label class="form-check-label time-text" for="flexRadioDefault1">
                                    {time}
                                    </label>
                                </div>
                                }
                           })}
                        </div>
                        <div className="col-xl-6 col-sm-12 mb-3">
                            {/* iterate appointment time array */}
                            {appointmentTime.map((time,index)=>{
                                // if yung index ay greater than 3, display ung natitirang time
                                if(index>3){
                                    return <div class="form-check">
                                    <input class="form-check-input" type="radio" name="time_" id="" value={time} onChange={handleChange} onBlur={formValidation} disabled={occupiedTime.includes(time)||unavailableTime(time)} checked={formData.time_===time}/>
                                    <label class="form-check-label time-text" for="flexRadioDefault1">
                                    {time}
                                    </label>
                                </div>
                                }
                           })}
                        </div>
                        <p className="error-message">{errors.time}</p>
                    </div>
                </div>
                
            </div>
            <div className="col-xl-6 col-sm-12 p-0">
                <div className="summary appointment-summary">
                    <h3 className='text-center mb-4 labels'>Appointment Summary</h3>
                    <div className="row appointment-summary-details">
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
                            {services?services.map(item=>(
                                item.service_id==formData.service_?item.service_name:''
                            )):''}
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
