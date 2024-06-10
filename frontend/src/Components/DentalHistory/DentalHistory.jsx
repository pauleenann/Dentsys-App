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


const DentalHistory = () => {
    const [history, setHistory] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [patientId, setPatientId] = useState(0);


    const {id} = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [historyResponse, invoiceResponse] = await Promise.all([
                    axios.get(`http://localhost:80/api2/${id}/?action=getProcedureHistory1`),
                    axios.get(`http://localhost:80/api2/${id}/?action=getInvoice`)
                ]);

                setHistory(historyResponse.data);
                setInvoice(invoiceResponse.data);
                setPatientId(historyResponse.data[0].p_id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    console.log(patientId)


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

    const [selectedTeeth, setSelectedTeeth] = useState({});

    const [patient, setPatient] = useState({
        action: 'addNewPatient',
        p_fname: '',
        p_lname: '',
        p_mname: '',
        p_ename: '',
        p_age: '',
        p_gender: '',
        p_email: '',
        p_phone: '',
        p_date: '',
        p_time: '',
        p_service: '',
        p_selectedTeeth: {}, 
        p_dentist: '',
        p_payment: '',
        p_paidamount: ''
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

        var imgSrc = toothImages[toothId].default;

        function historyTooth(element){
            imgSrc = toothImages[element].selected;
        }
    
        var toothHistory=[];
        
        history.map((tooth,key)=>{
            toothHistory =  Object.keys(JSON.parse(tooth.p_selectedTeeth))
                .filter(key => JSON.parse(tooth.p_selectedTeeth)[key]);
            // toothHistory.forEach(element => {
            //     //console.log(element)
            //     imgSrc = element ==  toothId ? toothImages[element].selected : toothImages[toothId].default;

            // });
            //console.log(toothHistory)
        })

        toothHistory.forEach(element => {
            if(toothId == element){
                historyTooth(element);
            }
            
        });

        //console.log(toothHistory)

        return (
            <div className="col tooth-container d-flex flex-column align-items-center">
                <img src={imgSrc} className='tooth' alt="" /> 
                <p className='text-center fw-semibold mt-2 mb-0'>{toothId}</p>
                
            </div>
        );
    };

    const renderTooth2 = (toothId) => {
        var imgSrc = toothImages[toothId].default;

        function historyTooth(element){
            imgSrc = toothImages[element].selected;
        }
    
        var toothHistory=[];
        
        history.map((tooth,key)=>{
            toothHistory =  Object.keys(JSON.parse(tooth.p_selectedTeeth))
                .filter(key => JSON.parse(tooth.p_selectedTeeth)[key]);
            // toothHistory.forEach(element => {
            //     //console.log(element)
            //     imgSrc = element ==  toothId ? toothImages[element].selected : toothImages[toothId].default;

            // });
            //console.log(toothHistory)
        })

        toothHistory.forEach(element => {
            if(toothId == element){
                historyTooth(element);
            }
            
        });

        //console.log(toothHistory)

        return (
            <div className="col tooth-container d-flex flex-column align-items-center" key={toothId}>
                <p className='text-center fw-semibold mt-2 mb-2'>{toothId}</p>
                <img src={imgSrc} className='tooth' alt="" key={toothId}/>
            </div>
        );
    };



    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:80/api2/user/save", patient);
          //navigate("/appointment-request-submitted", {state: patient});
        } catch (err) {
          console.log(err);
        //   setError(true)
        }
      };

    //console.log(patient);
    // const selectedTooth = JSON.parse(history.p_selectedTeeth);
    

  return (
    <div className='wrapper'>
        <AdminNavbar></AdminNavbar>
      <div id="content">
        <AdminInfo></AdminInfo>

        {/* go back button */}
        <div className="row">
            <Link to='/patient-list'>
            <div className="back-to-patients">
                <p><i class="fa-solid fa-chevron-left"></i> <Link to={`/view-patient-info/${patientId}`}><span>Go back</span></Link></p>
            </div>
            </Link>
        </div>

        {/* Header */}
        <div className="rol">
            <h1>Dental History</h1>
        </div>

        {/* form */}
        {Array.isArray(history) && history.length > 0 ? (
         history.map((item, index) => (
                    <div className="rol add-patient-container mt-4">
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
                                    {item.p_service}
                                </div>
                                {/* Tooth no */}
                                <div className="col-2 text mt-3">
                                    Tooth no.:
                                </div>
                                <div className="col-10 fw-semibold mt-3">
                                {Object.keys(JSON.parse(item.p_selectedTeeth))
                                .filter(key => JSON.parse(item.p_selectedTeeth)[key])
                                .join(', ')
                                }
                                </div>
                                {/* dentist */}
                                <div className="col-2 text mt-3">
                                    Dentist:
                                </div>
                                <div className="col-10 fw-semibold mt-3">
                                    Dr. {item.p_dentist}
                                </div>

                            </div>

                            {/* tooth chart */}
                            <div className="tooth-chart mt-4">
                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        {[16, 15, 14, 13, 12,11, 10, 9].map(renderTooth)}
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
                                                <li>{item.p_service}<ul>
                                                <li>Tooth No.: <span>
                                                    {Object.keys(JSON.parse(item.p_selectedTeeth))
                                                    .filter(key => JSON.parse(item.p_selectedTeeth)[key])
                                                    .join(', ')
                                                    }
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
                        {invoice.map((item,key)=>{
                            if(item.inv_status == 'paid'){
                                return(
                                    <div><div className="row">
                                        <table className='table payment-table'>
                                            <tbody>
                                                <tr>
                                                    <td className='payment-table-text'>{item.p_date}</td>
                                                    <td className='payment-table-text'>{item.p_time}</td>
                                                    <td className='payment-table-text'>{item.p_payment}</td>
                                                    <td className='payment-table-text '>₱ {item.p_paidamount}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                    {/* total paid */}
                                    <div className="row text-end">
                                        <div className="col total-paid mb-2">
                                            <h5>Total Paid</h5>
                                            <h5 className='m-0'>₱ <span>{item.p_paidamount}</span></h5>
                                        </div>
                                        <hr />
                                    </div>

                                    <div className="row text-end">
                                        <div className="col balance mb-3">
                                            <h6 className='balance-text'>Balance</h6>
                                            <p className='m-0 balance-text'>₱ <span className='balance-text'>0.00</span></p>
                                        </div>
                                    </div>
                                    </div>
                                    
                                );
                            }else if(item.inv_status == 'pending'){
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
                            }
                        })}
                        
                        

                        
                    </div>
        ))) : (<p>No history available.</p>)} 
      </div>
      
    </div>
  )
}

export default DentalHistory
