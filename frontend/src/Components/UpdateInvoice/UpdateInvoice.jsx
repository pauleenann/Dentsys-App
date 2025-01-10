import React, { useEffect } from 'react'
import './UpdateInvoice.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DentalHistory from '../DentalHistory/DentalHistory';
import isAuthenticated from '../Auth';

const UpdateInvoice = () => {
    const {id} = useParams();
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    const [payment, setPayment] = useState({
        action: 'addPayment',
        pay_method: 'CASH', // set CASH as default payment method
        inv_id: id
    });
    const [submitForm, setSubmitForm] = useState(false)
    const [errors, setErrors] = useState({})
    const [totalPaid, setTotalPaid] = useState(0);
    const [invTotal, setInvTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const balance = invTotal - totalPaid;

    useEffect(() => {
        getTotalPaid();
        getInvoiceDetails();
        getPayment();
        //getBalance();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment({...payment,[name]: value});
    }

    const navigate = useNavigate();

    const getTotalPaid = async ()=> {
        try {
            const response = await axios.get(`https://prodbackenddentsys.tuplrc-cla.com/${id}/?action=getTotalPaid`);
            console.log('Full API response:', response);
            console.log('API response data:', response.data);

            if (Array.isArray(response.data)) {
                setTotalPaid(response.data[0].total_paid);
            } else {
                console.error('API response is not an array:', response.data);
                setTotalPaid(0);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setTotalPaid(0);
        }
    }

    const handleClick = async () => {
        if(submitForm === false){
            formValidation();
        }else{
            setLoading(true);
            try {
            console.log("Sending payment data to server:", payment);
            await axios.post("https://prodbackenddentsys.tuplrc-cla.com/", payment).finally(() => setLoading(false));;
            navigate(`/invoice-details/${id}`);
            } catch (err) {
            console.log(err);
            //   setError(true)
            }
        }
    };

    const getInvoiceDetails = async()=> {
        try {
            const response = await axios.get(`https://prodbackenddentsys.tuplrc-cla.com/${id}/?action=getInvoiceDetails`);
            console.log('Full API response:', response);
            console.log('API response data:', response.data[0].inv_totalamount);

            if (Array.isArray(response.data)) {
                setInvoiceDetails(response.data);

            } else {
                console.error('API response is not an array:', response.data);
                setInvoiceDetails([]);
            }
            setInvTotal(response.data[0].inv_totalamount)
        } catch (error) {
            console.error('Error fetching services:', error);
            setInvoiceDetails([]);
        }
    }

    const getPayment = async()=> {
        try {
            const response = await axios.get(`https://prodbackenddentsys.tuplrc-cla.com/${id}/?action=getPayment`);
            console.log('Full API response:', response);
            console.log('API response data:', response.data);

            if (Array.isArray(response.data)) {
                setPaymentHistory(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setPaymentHistory([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setPaymentHistory([]);
        }
    }

    const formValidation = ()=>{
        let error = {};
        
        if(!payment.pay_date){
            error.pay_date = 'Enter date of payment'
        }
        if(!payment.pay_time){
            error.pay_time = 'Enter time of payment'
        }
        if(payment.pay_amount > balance || !payment.pay_amount || payment.pay_amount<=0){
            error.pay_amount = 'Amount must be valid nor exceed the balance'
        }

        if(Object.keys(error).length == 0){
            setSubmitForm(true)
        }else{
            setSubmitForm(false)
        }
        
        setErrors(error)

    }
   
  return (
    <div className='update-invoice-container'>
        <AdminNavbar />
        <div className="content">
            <AdminInfo />
            {/* go back button */}
            <div className="row">
                <Link to={`/invoice-details/${id}`}className='back'>
                   <i className="fa-solid fa-chevron-left mt-4"></i> <span>Go back</span>
                </Link>
            </div>

            {invoiceDetails.map((item, key)=>(
                <div className="row invoice-detail-info">
                <div className="row invoice-detail-header">
                    <div className="col invoice-detail-header-text">Invoice Details</div>
                </div>
                <div className="row invoice-user-info">
                    <div className="col">
                        <div className="row">
                            <div className="col-3">
                                <div className="row">Client Name:</div>
                                <div className="row">
                                    Issue date:
                                </div>
                                <div className="row">Due Date:</div>
                            </div>
                            <div className="col update-inv-info">
                                <div className="row">{item.p_fname} {item.p_lname}</div>
                                <div className="row">{item.inv_issuedate}</div>
                                <div className="row">{item.inv_duedate}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <div className="col">
                                <div className="row">Status:</div>
                            </div>
                            <div className="col">
                                <div className="row update-status">{item.inv_status}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row cost-header">
                    <div className="col">Procedure Description</div>
                    <div className="col text-center">Cost</div>
                </div>
                <div className="row price">
                    <div className="col">
                        <ul>
                            <li>{item.service_name}</li>
                            <li>{item.option_name}</li>
                        </ul>
                    </div>
                    <div className="col text-center total-amount-paid">
                        ₱ <span>{item.inv_totalamount}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center my-3">
                         <span className='update-nothing-follows'>--- <i>Nothing Follows</i> ---</span>
                    </div>
                </div>
                <div className="row invoice-total-price">
                    <div className="col"></div>
                    <div className="col">
                        <div className="row">
                            <div className="col text-end">
                                Total
                            </div>
                            <div className="col">
                                ₱ <span>{item.inv_totalamount}</span>
                            </div>  
                        </div>
                    </div>
                </div>

                <div className="row p-5 invoice-payment">
                    <div className="col-12 ">Payment</div>
                </div>

                {paymentHistory.map((item, key)=>{
                    if(payment.length != 0){
                        return(
                            <div className="row  d-flex justify-content-center mb-3">
                                <div className="col-12 invoice-payment-details">
                                    <div className="row">
                                        <div className="col-2">{item.pay_date}</div>
                                        <div className="col">{item.pay_time}</div>
                                        <div className="col-1">{item.pay_method}</div>
                                        <div className="col-2">
                                            ₱ <span>{item.pay_amount}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    }else{
                        return(
                            <div className="row">
                               <div className="col">
                                    <span>--- <i>No Payment Record Yet</i> ---</span>
                               </div>
                            </div>
                        );
                    }
                })}

                {/* edit invoice */}
                <div className="row edit-invoice my-5">
                    <div className="col">
                        <label htmlFor="pay_date">Date</label><br />
                        <input type="date" id='pay_date' name='pay_date' className='inv_input' onChange={handleChange} onBlur={formValidation}/>
                        <p className="error-message">{errors.pay_date}</p>
                    </div>
                    <div className="col">
                        <label htmlFor="pay_time">Time</label><br />
                        <input type="time" id ='pay_time' name='pay_time' className='inv_input' onChange={handleChange} onBlur={formValidation}/>
                        <p className="error-message">{errors.pay_time}</p>
                    </div>
                    <div className="col ">
                        <label htmlFor="pay_method">Payment Method</label><br />
                        <input type="text" className='inv_input' value={payment.pay_method}/>
                    </div>
                    <div className="col">
                        <label htmlFor="pay_amount">Paid Amount</label><br />
                        <input type='number' id='pay_amount' name='pay_amount' className='inv_input' onChange={handleChange} onBlur={formValidation} min='0' max={balance} placeholder={`Balance: ₱${balance}`}/>
                        <p className="error-message">{errors.pay_amount}</p>
                    </div>
                </div>

                <div className="row text-center mb-5">
                    <div className="col">
                        <button className='btn invoice-update-button2' onClick={handleClick}>Update</button>
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <div className="row mt-5 mb-3">
                            <div className="col text-end">Total Paid</div>
                            <div className="col">P <span>600.00</span></div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row mb-5">
                    <div className="col"></div>
                    <div className="col">
                        <div className="row my-2">
                            <div className="col text-end invoice-balance">Balance</div>
                            <div className="col invoice-balance">P <span className='invoice-balance'>600.00</span></div>
                        </div>
                    </div>
                </div> */}
                

            </div>
            ))}
            

        
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

export default isAuthenticated(UpdateInvoice);
