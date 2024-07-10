import React, { useEffect } from 'react'
import './AddService.css'
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


const AddService = () => {
    const [services, setServices] = useState([]);
    const [selectedTeeth, setSelectedTeeth] = useState({});
    const [servicesDetails, setServicesDetails] = useState([]);
    const [dentists, setDentists] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const intValue = parseInt(id, 10);

    let allToothIds = [];
    for(let i = 0; i < 32; i++){
        allToothIds[i] = i+1;
    }
    console.log(allToothIds)

    useEffect(() => {
        getServices();
        getServicesDetails();
        getDentist();
    }, []);
    
    const toothImages = {
        1: { default: tooth1, selected: selected1 },
        2: { default: tooth2, selected: selected2 },
        3: { default: tooth3, selected: selected3 },
        4: { default: tooth4, selected: selected4 },
        5: { default: tooth5, selected: selected5 },
        6: { default: tooth6, selected: selected6 },
        7: { default: tooth7, selected: selected7 },
        8: { default: tooth8, selected: selected8 },
        9: { default: tooth9, selected: selected9 },
        10: { default: tooth10, selected: selected10 },
        11: { default: tooth11, selected: selected11 },
        12: { default: tooth12, selected: selected12 },
        13: { default: tooth13, selected: selected13 },
        14: { default: tooth14, selected: selected14 },
        15: { default: tooth15, selected: selected15 },
        16: { default: tooth16, selected: selected16 },
        17: { default: tooth17, selected: selected17 },
        18: { default: tooth18, selected: selected18 },
        19: { default: tooth19, selected: selected19 },
        20: { default: tooth20, selected: selected20 },
        21: { default: tooth21, selected: selected21 },
        22: { default: tooth22, selected: selected22 },
        23: { default: tooth23, selected: selected23 },
        24: { default: tooth24, selected: selected24 },
        25: { default: tooth25, selected: selected25 },
        26: { default: tooth26, selected: selected26 },
        27: { default: tooth27, selected: selected27 },
        28: { default: tooth28, selected: selected28 },
        29: { default: tooth29, selected: selected29 },
        30: { default: tooth30, selected: selected30 },
        31: { default: tooth31, selected: selected31 },
        32: { default: tooth32, selected: selected32 },
    };


    const [patient, setPatient] = useState({
        action: 'procedureHistory',
        p_id: intValue,
        p_date: '',
        p_time: '',
        p_selectedTeeth: [], 
        p_dentist: '',
        p_service: '',
        p_severity_material: '',
        inv_totalamount: totalPrice,
        inv_status: 'pending'
        
    });

    const [selectedToothNumbers, setSelectedToothNumbers] = useState([]);  // State for selected tooth number
    
    const handleToothClick = (toothId) => {
        setPatient((prevState) => ({
            ...prevState,
            p_selectedTeeth: {
                ...prevState.p_selectedTeeth,
                [toothId]: !prevState.p_selectedTeeth[toothId],
            },
        }));

        // displays selected tooth sa tooth number input field
        setSelectedToothNumbers(prevSelectedToothNumbers => {
            const updatedSelectedToothNumbers = prevSelectedToothNumbers.includes(toothId) ?
                prevSelectedToothNumbers.filter(id => id !== toothId) :
                [...prevSelectedToothNumbers, toothId];

            return updatedSelectedToothNumbers;
        });

        
    };

    const renderTooth = (toothId) => {
        let isSelected;
        let imgSrc;

        if (patient.p_service === "Oral prophylaxis (Teeth Cleaning)") {
            isSelected = true;
            imgSrc = toothImages[toothId].selected;
        } else {
            isSelected = patient.p_selectedTeeth[toothId];
            imgSrc = isSelected ? toothImages[toothId].selected : toothImages[toothId].default;
        }


        return (
            <div className="col tooth-container" key={toothId}>
                <img src={imgSrc} className='tooth' alt="" />
                {patient.p_service === "Oral prophylaxis (Teeth Cleaning)" ? "" : <button
                    className='btn tooth-button'
                    onClick={() => handleToothClick(toothId)}
                >
                    {toothId}
                </button>}
            </div>
        );
    };

    useEffect(() => {
        if (patient.p_service === "Oral prophylaxis (Teeth Cleaning)") {
            allToothIds.forEach(id => handleToothClick(id));
        }else{
            patient.p_selectedTeeth = []
            setSelectedToothNumbers([])
        }
    }, [patient.p_service]);

    const renderTooth2 = (toothId) => {
        let isSelected;
        let imgSrc;

        if (patient.p_service === "Oral prophylaxis (Teeth Cleaning)") {
            isSelected = true;
            imgSrc = toothImages[toothId].selected;
        } else {
            isSelected = patient.p_selectedTeeth[toothId];
            imgSrc = isSelected ? toothImages[toothId].selected : toothImages[toothId].default;
        }


        return (
            <div className="col tooth-container" key={toothId}>
                <img src={imgSrc} className='tooth' alt="" />
                {patient.p_service === "Oral prophylaxis (Teeth Cleaning)" ? "" : <button
                    className='btn tooth-button'
                    onClick={() => handleToothClick(toothId)}
                >
                    {toothId}
                </button>}
            </div>
        );
        
    };
    
    //fetch services table
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
    //fetch servicesdetails table
    async function getServicesDetails() {
        try {
            const response = await axios.get('http://localhost:80/api2/?action=getServicesDetails');
            console.log('Full API response:', response);
            console.log('API response data:', response.data);

            if (Array.isArray(response.data)) {
                setServicesDetails(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setServicesDetails([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setServicesDetails([]);
        }
    }
    //fetch dentist table
    async function getDentist() {
        try {
            const response = await axios.get('http://localhost:80/api2/?action=getDentist');
            console.log('Full API response:', response);
            console.log('API response data:', response.data);

            if (Array.isArray(response.data)) {
                setDentists(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setDentists([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setDentists([]);
        }
    }



    // const dentist = [
    //     { value: 'Dr. Dingcong', label: 'Dr. Dingcong' },
    //     { value: 'Dr. Bernal', label: 'Dr. Bernal' },
    // ];

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
        setLoading(true);
        try {
          console.log("Sending patient data to server:", patient);
          await axios.post("http://localhost:80/api2/user/save", patient).finally(() => setLoading(false));;
          navigate(`/view-patient-info/${id}`);
        } catch (err) {
          console.log(err);
        //   setError(true)
        }
      };


    //useEffect hook is used to compute the total price whenever any of the
    //dependencies (patient.p_service, patient.p_severity_material, patient
    //p_selectedTeeth, servicesDetails) change.
      useEffect(() => {
        //function to compute total price
        const computeTotalPrice = () => {
            let price = 0; //initialize price to 0
            servicesDetails.forEach(service => {
                if(patient.p_service != "Oral prophylaxis (Teeth Cleaning)"){
                    if (patient.p_service == service.service_name && patient.p_severity_material === service.sd_description) {
                    price = service.sd_price * totalTooth;
                    }
                }else{
                    if (patient.p_service == service.service_name && patient.p_severity_material === service.sd_description) {
                        price = service.sd_price;
                        }
                }
                
            });
            setTotalPrice(price);
            //set totalAmount to totalPrice useState
            setPatient(prevState => ({
                ...prevState,
                inv_totalamount: price
            }));
        };
        // Compute the total number of selected teeth
        const totalTooth = Object.values(patient.p_selectedTeeth).filter(value => value === true).length;
         // Call the computeTotalPrice function to update the totalPrice state
        computeTotalPrice();
        
    }, [patient.p_service, patient.p_severity_material, patient.p_selectedTeeth, servicesDetails]);
 
    console.log(patient);
    console.log(totalPrice)
    //console.log(totalTooth);
    //console.log(servicesDetails);

    // const totalTooth = Object.values(patient.p_selectedTeeth).filter(value => value === true).length;//calculate selected tooth that are true

    // console.log(totalTooth); // This will print the number of true values in the object

  return (
    <div className='wrapper'>
        <AdminNavbar></AdminNavbar>
      <div id="content">
        <AdminInfo></AdminInfo>

        {/* go back button */}
        <div className="row">
            <Link to='/patient-list'>
            <div className="back-to-patients">
                <p><i class="fa-solid fa-chevron-left"></i> <span>Go back</span></p>
            </div>
            </Link>
        </div>

        {/* Header */}
        <div className="rol">
            <h1>Add a new service</h1>
        </div>

        {/* form */}
        <div className="rol add-patient-container mt-4">
            <div className="col">                
                <div className="row">
                    {/* date */}
                    <div className="col-4 mb-5 mt-5 ">
                        <label htmlFor="" className="form-label labels" >Date</label>
                        <input  type="date" id="p_date" name="p_date" className="form-control labels" value={patient.p_date} onChange={handleChange}/>
                    </div>

                    {/* time */}
                    <div className="col-6 mt-5 mb-3">
                    <label htmlFor="" className="form-label labels" >Time</label>
                    <div className="row">
                        <div className="col-xl-6 col-sm-12 mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="p_time" id="9-10am" value="9:00 AM - 10:00 AM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault1">
                            9:00 AM - 10:00 AM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="p_time" id="10-11am" value="10:00 AM - 11:00 AM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            10:00 AM - 11:00 AM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="p_time" id="11-12am" value="11:00 AM - 12:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            11:00 AM - 12:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="p_time" id="12-1pm" value="12:00 PM - 1:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            12:00 PM - 1:00 PM
                            </label>
                            </div>
                        </div>
                        <div className="col-xl-6 col-sm-12 mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="p_time" id="1-2pm" value="1:00 PM - 2:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault1">
                            1:00 PM - 2:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="p_time" id="2-3pm" value="2:00 PM - 3:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            2:00 PM - 3:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="p_time" id="3-4pm" value="3:00 PM - 4:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            3:00 PM - 4:00 PM
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="p_time" id="4-5pm" value="4:00 PM - 5:00 PM" onChange={handleChange}/>
                            <label class="form-check-label time-text" for="flexRadioDefault2">
                            4:00 PM - 5:00 PM
                            </label>
                            </div>
                        </div>
                    </div>
                </div>
                
        
                    <div className="row">
                        {/* services */}
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-label labels mb-2">Type of Service</label>
                        <select class="form-select" aria-label="Default select example" id="p_service" name="p_service" value={patient.p_service} onChange={handleChange}>
                            <option value="" labels>Select a Service</option>
                                    {services.map((service, key) => (
                                        <option key={service.service_id} value={service.service_name}>{service.service_name}</option>
                                    ))}
                        </select>
                    </div>

                    {/* service severity/material*/}
                    <div className="col-4">
                        <label htmlFor="" className="form-label labels mb-2">Level of Severity/Type of Material</label>
                        <select class="form-select" aria-label="Default select example" id="p_severity_material" name="p_severity_material" value={patient.p_severity_material} onChange={handleChange}>
                            <option value="" labels>Select a Severity/Material</option>
                            {servicesDetails.map((service,key)=>{
                                if(service.service_name === patient.p_service){
                                    return(
                                        <option key={service.sd_id} value={service.sd_description}>{service.sd_description}</option>
                                    );
                                }
                            })}
                                    
                        </select>
                    </div>
                    </div>
                    

                    {/* tooth num */}
                    <div className="col-4 mb-5">
                        <label htmlFor="" className="form-label labels" >Tooth Number </label>
                        <input type="text" className="form-control " name='toothNumber' id='toothNumber' value={selectedToothNumbers} onChange={() => {}} />
                    </div>
                </div>

                
                {/* tooth chart */}
                <div className="tooth-chart">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                {[16, 15, 14, 13, 12, 11, 10, 9].map(renderTooth)}
                            </div>
                            <div className="row">
                                {[17, 18, 19, 20, 21, 22, 23, 24].map(renderTooth2)}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                {[8, 7, 6, 5, 4, 3, 2, 1].map(renderTooth)}
                            </div>
                            <div className="row">
                                {[25, 26, 27, 28, 29, 30, 31, 32].map(renderTooth2)}
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
                    <select class="form-select" aria-label="Default select example" id="p_dentist" name="p_dentist" value={patient.p_dentist} onChange={handleChange}>
                        <option value="" labels disabled>Select Dentist</option>
                                {dentists.map((dentist,key) => (
                                            <option key={dentist.d_id} value={dentist.d_lname}>Dr. {dentist.d_lname}</option>
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
                                    <li className='service-name'>{patient.p_service}<ul>
                                    <li className='tooth-no'>Tooth No.: <span>
                                        {Object.entries(patient.p_selectedTeeth)
                                            .filter(([toothNumber, isSelected]) => isSelected)
                                            .map(([toothNumber]) => toothNumber)
                                            .join(', ')
                                        }
                                    </span></li></ul></li>
                                </ul>
                            </div>
                            {/* receipt cost */}
                            <div className="receipt-cost">
                                <p>₱ 
                                {servicesDetails.map((service, key) => {
                                    if(patient.p_service != "Oral prophylaxis (Teeth Cleaning)"){
                                        if (patient.p_service === service.service_name && patient.p_severity_material === service.sd_description) {
                                            //binibilang kung ilang tooth yung may value na true sa json
                                            const totalTooth = Object.values(patient.p_selectedTeeth).filter(value => value === true).length;
                                            //calculates total cost
                                            const cost = service.sd_price * totalTooth;
                                            return (
                                                
                                                <span key={key}>{cost}</span>
                                            );
                                        }
                                    }else{
                                        if (patient.p_service === service.service_name && patient.p_severity_material === service.sd_description) {
                                        
                                            const cost = service.sd_price ;
                                            return (
                                                
                                                <span key={key}>{cost}</span>
                                            );
                                        }
                                    }
                                        return null;
                                    })}</p>
                            </div>
                        </div>
                        {/* total */}
                        <div className="receipt-total">
                            <div>

                            </div>
                            <div className="receipt-total-amount">
                                <h6 className='m-0'>Total Due</h6>
                                <p className='m-0'>₱ <span>{totalPrice}</span></p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            {/*  
            <h5 className='mb-4 mt-5'>Payment</h5>*/}

            
            {/* row for payment */}
            {/* <div className="row"> */}
                {/* payement method */}
                {/* <div className="col-4">
                    <label htmlFor="" className="form-lavel labels mb-2">Payment Method</label>
                    <select class="form-select" aria-label="Default select example" id="p_payment" name="p_payment" value={patient.p_payment} onChange={handleChange}>
                        <option value="" labels disabled>Select Payment Method</option>
                                    {payment.map((payment) => (
                                        <option key={payment.value} value={payment.value}>{payment.label}</option>
                                    ))}
                    </select>
                </div> */}
                {/* paid amount */}
                {/* <div className="col-4">
                    <label htmlFor="" className="form-label labels" >Paid Amount</label>
                    <input type="number" className="form-control " name='p_paidamount' id='paidamount' value={patient.p_paidamount} onChange={handleChange}/>
                </div>
            </div> */}
            {/* end of payment row */}

            {/* total paid */}
            {/* <div className="row text-end">
                <div className="col total-paid mb-2">
                    <h6>Total Paid</h6>
                    <p className='m-0'>₱ <span>0.00</span></p>
                </div>
                <hr />
            </div> */}

            {/* <div className="row text-end">
                <div className="col balance mb-3">
                    <h6 className='balance-text'>Balance</h6>
                    <p className='m-0 balance-text'>₱ <span className='balance-text'>0.00</span></p>
                </div>
            </div> */}

            {/* button */}
            <div className="text-center">
                <button className='btn save-patient-button' onClick={handleClick}>Save</button>
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

export default AddService
