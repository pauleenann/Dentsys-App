import React, { useEffect } from 'react'
import './DentalHistory.css'
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
import isAuthenticated from '../Auth';

const DentalHistory = () => {
    const [history, setHistory] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [payment, setPayment] = useState([]);
    const [patientId, setPatientId] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [selectedTeeth, setSelectedTeeth] = useState([])

    const {id} = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [historyResponse, invoiceResponse, paymentResponse, totalpaidResponse] = await Promise.all([
                axios.get(`http://localhost:80/api2/${id}/?action=getDentalRecord`),
                axios.get(`http://localhost:80/api2/${id}/?action=getInvoice`),
                axios.get(`http://localhost:80/api2/${id}/?action=getPaymentDetails`),
                await axios.get(`http://localhost:80/api2/${id}/?action=getTotalPaidDentalHistory`)
            ]);

            setHistory(historyResponse.data);
            setSelectedTeeth(JSON.parse(historyResponse.data[0].p_selectedTeeth))
            setInvoice(invoiceResponse.data);
            setPayment(paymentResponse.data)
            setTotalPaid(totalpaidResponse.data[0].total_paid);
            //stores patient id to patientId for go back button
            setPatientId(historyResponse.data[0].p_id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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

    const renderTooth = (toothNum)=>{
        let toothImage = selectedTeeth.includes(toothNum)?toothImages[toothNum].selected:toothImages[toothNum].default;

        return (
            <div className='tooth'>
                <img src={toothImage} alt="" />
                <button>{toothNum}</button>
            </div>
        )
    }

  return (
    <div className='dental-history-container'>
        <AdminNavbar/>
      <div className="content">
        <AdminInfo/>
        {/* go back button */}
        <div className="row">
            <Link to={`/view-patient-info/${patientId}`} className='back'>
                <i class="fa-solid fa-chevron-left mt-4"></i>
                <span>Go back</span>
            </Link>
        </div>

        {/* Header */}
        <div className="row mt-3">
            <h1 className='dental-history-title'>Dental History</h1>
        </div>

        {/* form */}
        {Array.isArray(history) && history.length > 0 ? (
         history.map((item, index) => (
                    <div className="rol dental-history-info mt-3">
                        <div className="col">                
                            <div className="row">
                                {/* date of service */}
                                <div className="col-2 text">
                                    Date of Service:
                                </div>
                                <div className="col-10 fw-semibold">
                                    {item.p_date}
                                </div>
                                {/* procedure */}
                                <div className="col-2 text mt-3">
                                    Procedure:
                                </div>
                                <div className="col-10 fw-semibold mt-3">
                                    {item.service_name}
                                </div>
                                {/* Tooth no */}
                                <div className="col-2 text mt-3">
                                    Tooth no.:
                                </div>
                                <div className="col-10 fw-semibold mt-3">
                                    {JSON.parse(item.p_selectedTeeth).join(', ')}
                                </div>
                                {/* dentist */}
                                <div className="col-2 text mt-3">
                                    Dentist:
                                </div>
                                <div className="col-10 fw-semibold mt-3">
                                    Dr. {item.u_fname} {item.u_lname}
                                </div>

                            </div>

                            {/* tooth chart */}
                            <div className="tooth-chart mt-4 row">
                                <div className="col-12">
                                    {[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1].map(renderTooth)}        
                                </div>
                                <div className="col-12">
                                    {[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32].map(renderTooth)}
                                </div>
                            </div>
                        </div>
                        {/* end of row for tooth chart */}

                        <hr className='mt-5'/>
                        <h4 className='text-center mt-5'>Payment Summary</h4>

                        {/* receipt */}
                        <div className=" row mt-5 mb-5">
                            <div className="col p-0">
                                {history.map((item, key)=>(
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
                                                <li className='service-name'>{item.service_name}<ul>
                                                <li className='tooth-no'>Severity/Material: <span>
                                                    {item.option_name}
                                                </span></li>
                                                <li className='tooth-no'>Tooth No.: <span>
                                                    {JSON.parse(item.p_selectedTeeth).join(', ')}
                                                </span></li></ul></li>
                                            </ul>
                                        </div>
                                        {/* receipt cost */}
                                        <div className="receipt-cost">
                                            <p>₱ <span>{invoice[0].inv_totalamount}</span></p>
                                        </div>
                                    </div>
                                    {/* total */}
                                    <div className="receipt-total">
                                        <div>

                                        </div>
                                        <div className="receipt-total-amount">
                                            <h6 className='m-0'>Total Due</h6>
                                            <p className='m-0'>₱ <span>{invoice[0].inv_totalamount}</span></p>
                                        </div>
                                    </div>
                                </div>
                                ))}
                                
                            </div>
                        </div>

                        <h5 className='mb-4 mt-5'>Payment</h5>

                        {/* row for payment */}
                        {payment.map((item,key)=>{
                            if(item.inv_status == 'paid' || item.inv_status == 'partial'){
                                return(
                                    <div><div className="row mb-3">
                                        <table className='table payment-table'>
                                            <tbody>
                                                <tr>
                                                    <td className='payment-table-text'>{item.pay_date}</td>
                                                    <td className='payment-table-text'>{item.pay_time}</td>
                                                    <td className='payment-table-text'>{item.pay_method}</td>
                                                    <td className='payment-table-text '>₱ {item.pay_amount}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                    </div>
                                );
                            }
                        })}

                        {invoice.map((item,key)=>{
                            if(item.inv_status == 'pending'){
                                return(
                                  <div className="row text-center">
                                    <p>Not paid yet. Go to Invoices tab to settle their accounts.</p>
                                </div>  
                                );  
                            }else if(item.inv_status == 'overdue'){
                                return(
                                  <div className="row text-center">
                                    <p>Overdue. Go to Invoices tab to settle their accounts.</p>
                                </div>  
                                );  
                            }else if(item.inv_status == "paid" || item.inv_status == "partial"){
                                return(
                                    <div>
                                        <div className="row">
                        <div className="col"></div>
                            <div className="col">
                                <div className="row mt-5 mb-3">
                                    <div className="col text-end">Total Paid</div>
                                    <div className="col">₱ <span>{totalPaid}</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    
                
                <hr />
                <div className="row mb-5">
                    <div className="col"></div>
                    <div className="col">
                        <div className="row my-2">
                            <div className="col text-end invoice-balance">Balance</div>
                            <div className="col invoice-balance">₱ <span className='invoice-balance'>{item.inv_totalamount==totalPaid?0:(item.inv_totalamount-totalPaid).toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
            </div>)}})}</div>
        ))) : (<p>No history available.</p>)} 
      </div>
      
    </div>
  )
}

export default isAuthenticated(DentalHistory);
