import React, { useEffect } from 'react'
import './UpdateInvoice.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DentalHistory from '../DentalHistory/DentalHistory';

const UpdateInvoice = () => {
    

  return (
    <div className='wrapper'>
        <AdminNavbar />
        <div id="content">
            <AdminInfo />
            {/* go back button */}
            <div className="row">
                <Link to='/invoice-details'>
                    <div className="back-to-patients">
                        <p><i className="fa-solid fa-chevron-left"></i> <span>Go back</span></p>
                    </div>
                </Link>
            </div>

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
                                <div className="row">Nathalie Dayao</div>
                                <div className="row">06/10/2024</div>
                                <div className="row">06/10/2024</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <div className="col">
                                <div className="row">Status:</div>
                            </div>
                            <div className="col">
                                <div className="row">Pending</div>
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
                            <li>Braces Adjustment</li>
                        </ul>
                    </div>
                    <div className="col text-center">
                        P <span>600.00</span>
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
                                P <span>600.00</span>
                            </div>  
                        </div>
                    </div>
                </div>

                <div className="row p-5 invoice-payment">
                    <div className="col-12 ">Payment</div>
                </div>

                <div className="row  d-flex justify-content-center mb-5">
                    <div className="col-12 invoice-payment-details">
                        <div className="row">
                            <div className="col-1">0/0/0</div>
                            <div className="col">1:03:00 PM</div>
                            <div className="col-1">CASH</div>
                            <div className="col-2">
                                P <span>600.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* edit invoice */}
                <div className="row edit-invoice mb-5">
                    <div className="col">
                        <label htmlFor="inv_date">Date</label><br />
                        <input type="date" id='inv_date' className='inv_input'/>
                    </div>
                    <div className="col">
                        <label htmlFor="inv_time">Time</label><br />
                        <input type="text" id='inv_time' className='inv_input'/>
                    </div>
                    <div className="col ">
                        <label htmlFor="inv_pay_method">Payment Method</label><br />
                        <input type="text" id='inv_pay_method' className='inv_input'/>
                    </div>
                    <div className="col">
                        <label htmlFor="inv_paid_amnt">Paid Amount</label><br />
                        <input type="text" id='inv_paid_amnt' className='inv_input'/>
                    </div>
                </div>

                <div className="row text-center mb-5">
                    <div className="col">
                        <button className='btn invoice-update-button2'>Update</button>
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

        
        </div>
    </div>
  )
}

export default UpdateInvoice;
