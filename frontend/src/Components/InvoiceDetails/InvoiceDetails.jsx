import React, { useEffect } from 'react'
import './InvoiceDetails.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DentalHistory from '../DentalHistory/DentalHistory';

const InvoiceDetails = () => {
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    const [payment, setPayment] = useState([]);
    const [totalPaid, setTotalPaid] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        getInvoiceDetails();
       getPayment();
       getTotalPaid();
    }, []);


    async function getInvoiceDetails() {
        try {
            const response = await axios.get(`http://localhost:80/api2/${id}/?action=getInvoiceDetails`);
            console.log('Full API response:', response);
            console.log('API response data:', response.data);

            if (Array.isArray(response.data)) {
                setInvoiceDetails(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setInvoiceDetails([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setInvoiceDetails([]);
        }
    }

    async function getPayment() {
        try {
            const response = await axios.get(`http://localhost:80/api2/${id}/?action=getPayment`);
            console.log('Full API response:', response);
            console.log('API response data:', response.data);

            if (Array.isArray(response.data)) {
                setPayment(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setPayment([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setPayment([]);
        }
    }

    async function getTotalPaid() {
        try {
            const response = await axios.get(`http://localhost:80/api2/${id}/?action=getTotalPaid`);
            console.log('Full API response:', response);
            console.log('API response data:', response.data);

            if (Array.isArray(response.data)) {
                setTotalPaid(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setTotalPaid([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setTotalPaid([]);
        }
    }

    console.log(invoiceDetails)
    console.log(payment)
    console.log(totalPaid)
    

  return (
    <div className='wrapper'>
        <AdminNavbar />
        <div id="content">
            <AdminInfo />
            {/* go back button */}
            <div className="row">
                <Link to='/invoice-list'>
                    <div className="back-to-patients">
                        <p><i className="fa-solid fa-chevron-left"></i> <span>Go back</span></p>
                    </div>
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
                            <div className="col">
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
                                <div className="row inv-status">{item.inv_status}</div>
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
                            <li>{item.p_service}</li>
                        </ul>
                    </div>
                    <div className="col text-center">
                        ₱ <span>{item.inv_totalamount}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center my-3">
                         <span>--- <i>Nothing Follows</i> ---</span>
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

                {payment.map((item, key)=>{
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

                
                    <div className="row text-center">
                        <div className="col">
                            <Link to={`/update-invoice/${item.inv_id}`}><button className='btn invoice-update-button'>Add Payment</button>
                            </Link>
                            
                        </div>
                    </div>
                
                
                {totalPaid.map((item,key)=>{
                    if(item.total_paid != 0){
                        return(
                            <div className="row">
                                <div className="col"></div>
                                <div className="col">
                                    <div className="row mt-5 mb-3">
                                        <div className="col text-end">Total Paid</div>
                                        <div className="col">₱ <span>{item.total_paid}</span></div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
                
                <hr />
                <div className="row mb-5">
                    <div className="col"></div>
                    <div className="col">
                        <div className="row my-2">
                            <div className="col text-end invoice-balance">Balance</div>
                            <div className="col invoice-balance">₱ <span className='invoice-balance'>600.00</span></div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            

        
        </div>
    </div>
  )
}

export default InvoiceDetails;
