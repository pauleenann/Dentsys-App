import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';
import './Invoice.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import isAuthenticated from '../Auth';


const Invoice = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        getInvoices();
       
    }, []);


    async function getInvoices() {
        try {
            const response = await axios.get('http://localhost:80/api2/?action=getInvoices');
            console.log('Full API response:', response);
            console.log('API response data:', response.data);

            if (Array.isArray(response.data)) {
                setInvoices(response.data);
            } else {
                console.error('API response is not an array:', response.data);
                setInvoices([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setInvoices([]);
        }
    }

    console.log(invoices.length)
  return (
    <div className="wrapper">
      <AdminNavbar />
      <div id="content">
        <AdminInfo />
        <div className="inv-header">
          <h1>Invoices</h1>
        </div>

        {/* invoice table header */}
        <div className="row invoice-table-header my-4 text-center">
            <div className="col inv-header-text">
                Invoice No.
            </div>
            <div className="col inv-header-text">
                Invoice Date.
            </div>
            <div className="col inv-header-text">
                Invoice Due Date.
            </div>
            <div className="col inv-header-text">
                Total Amount
            </div>
            <div className="col-1 inv-header-text">
                Status
            </div>
            <div className="col-1 inv-header-text">
                
            </div>
        </div>

        {invoices.length==0?<p className='text-center'>No invoices</p>:invoices.map((item, key)=>{
            if(item.inv_status === 'paid'){
                return(
                    <div className="row inv-paid-row mb-4 text-center d-flex align-items-center">
                        <div className="col ">
                            {item.inv_id}
                        </div>
                        <div className="col">
                            {item.inv_issuedate}
                        </div>
                        <div className="col">
                            {item.inv_duedate}
                        </div>
                        <div className="col">
                            ₱ {item.inv_totalamount}
                        </div>
                        <div className="col-1 d-flex justify-content-center">
                            {/* status button */}
                            <div className='inv-paid text-center'>Paid</div>
                        </div>
                        <div className="col-1 d-flex justify-content-center">
                            <Link to={`/invoice-details/${item.inv_id}`}><button className='btn inv-view-button'>View</button></Link>
                            
                        </div>
                    </div>
                );
            }else if(item.inv_status === 'pending' || item.inv_status === 'partial'){
                return(
                    <div className="row inv-pending-row mb-4 text-center d-flex align-items-center">
                        <div className="col">
                            {item.inv_id}
                        </div>
                        <div className="col">
                            {item.inv_issuedate}
                        </div>
                        <div className="col">
                            {item.inv_duedate}
                        </div>
                        <div className="col">
                            ₱ {item.inv_totalamount}
                        </div>
                        <div className="col-1 d-flex justify-content-center">
                            {/* status button */}
                            <div className='inv-pending text-center'>Pending</div>
                        </div>
                        <div className="col-1 d-flex justify-content-center"><Link to={`/invoice-details/${item.inv_id}`}><button className='btn inv-view-button'>View</button></Link>
                        
                        </div>
                    </div>
                );
            }else if(item.inv_status === 'overdue'){
                return(
                    <div className="row inv-overdue-row mb-4 text-center d-flex align-items-center">
                        <div className="col">
                            {item.inv_id}
                        </div>
                        <div className="col">
                            {item.inv_issuedate}
                        </div>
                        <div className="col">
                            {item.inv_duedate}
                        </div>
                        <div className="col">
                            ₱ {item.inv_totalamount}
                        </div>
                        <div className="col-1 d-flex justify-content-center">
                            {/* status button */}
                            <div className='inv-overdue'>Overdue</div>
                        </div>
                        <div className="col-1 d-flex justify-content-center">
                        <Link to={`/invoice-details/${item.inv_id}`}><button className='btn inv-view-button'>View</button></Link>
                        </div>
                    </div>
                );
            }
        })}
        
      </div>
    </div>
  )
}

export default isAuthenticated(Invoice);
