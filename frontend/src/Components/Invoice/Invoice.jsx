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

    const getInvoices = async ()=> {
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

  return (
    <div className="invoice-container">
      <AdminNavbar />
      <div className="content">
        <AdminInfo />
        <div className="inv-header">
          <h1>Invoices</h1>
        </div>

        {/* invoice table header */}
        <div className="row invoice-table-header text-center">
            <div className="col">
                Invoice No.
            </div>
            <div className="col">
                Invoice Date.
            </div>
            <div className="col">
                Invoice Due Date.
            </div>
            <div className="col">
                Total Amount
            </div>
            <div className="col-1">
                Status
            </div>
            <div className="col-1">
                
            </div>
        </div>

        {invoices.length==0?<p className='text-center mt-5'>No invoices</p>:invoices.map((item, key)=>{
            if(item.inv_status === 'paid'){
                return(
                    <div className="row inv-paid-row text-center d-flex align-items-center">
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
                            <div className='inv-paid text-center'><span>Paid</span></div>
                        </div>
                        <div className="col-1 d-flex justify-content-center">
                            <Link to={`/invoice-details/${item.inv_id}`}className='inv-view-button btn'>View</Link>
                        </div>
                    </div>
                );
            }else if(item.inv_status === 'pending' || item.inv_status === 'partial'){
                return(
                    <div className="row inv-pending-row text-center d-flex align-items-center">
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
                            <div className='inv-pending text-center'>
                                <span>Pending</span></div>
                        </div>
                        <div className="col-1 d-flex justify-content-center"><Link to={`/invoice-details/${item.inv_id}`} className='btn inv-view-button'>View</Link>
                        </div>
                    </div>
                );
            }else if(item.inv_status === 'overdue'){
                return(
                    <div className="row inv-overdue-row text-center d-flex align-items-center">
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
                        <Link to={`/invoice-details/${item.inv_id}`} className='btn inv-view-button'>View</Link>
                        </div>
                    </div>
                );
            }
        })}

        {/* pagination */}
        <div className="inv-pagination">
            {/* pages */}
            <div>Page <span>1</span> of <span>0</span></div>
            {/* prev and next button */}
            <div className="inv-buttons">
                {/* prev */}
                <button className='btn inv-prev'>Prev</button>
                {/* next */}
                <button className='btn inv-next'>Next</button>
            </div>
        </div>    
      </div>

    </div>
  )
}

export default isAuthenticated(Invoice);
