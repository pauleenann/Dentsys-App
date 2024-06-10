import React from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';
import './Invoice.css';

const Invoice = () => {
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

        {/* box for paid invoice */}
        <div className="row inv-paid-row mb-4 text-center d-flex align-items-center">
            <div className="col ">
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
            <div className="col-1 d-flex justify-content-center">
                {/* status button */}

                <div className='inv-paid text-center'>Paid</div>
            </div>
            <div className="col-1 d-flex justify-content-center">
                <button className='btn inv-view-button'>View</button>
            </div>
        </div>
        {/* box for pending invoice */}
        <div className="row inv-pending-row mb-4 text-center d-flex align-items-center">
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
            <div className="col-1 d-flex justify-content-center">
                {/* status button */}
                <div className='inv-pending text-center'>Pending</div>
            </div>
            <div className="col-1 d-flex justify-content-center">
               <button className='btn inv-view-button'>View</button>
            </div>
        </div>
        {/* box for overdue invoice */}
        <div className="row inv-overdue-row mb-4 text-center d-flex align-items-center">
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
            <div className="col-1 d-flex justify-content-center">
                {/* status button */}
                <div className='inv-overdue'>Overdue</div>
            </div>
            <div className="col-1 d-flex justify-content-center">
                <button className='btn inv-view-button'>View</button>
            </div>
        </div>




      </div>
    </div>
  )
}

export default Invoice
