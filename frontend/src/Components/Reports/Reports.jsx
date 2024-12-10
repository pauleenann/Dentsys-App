import React from 'react'
import './Reports.css'
import isAuthenticated from '../Auth';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';


const Reports = () => {
  return (
    <div className='reports-container'>
        <AdminNavbar />
        <div className="content">
            <AdminInfo />
            {/* reports header */}
            <div className="reports-header mb-3">
                <h1>Reports</h1>
            </div>
            {/* reports filter box */}
            <div className="reports-filter-box">
                <h3>Generate Reports</h3>
                {/* report type */}
                <div className="reports-type">
                    <label htmlFor="">Type of Report</label>
                    <select name="" id="">
                        <option value="" disabled selected>Select report type</option>
                    </select>
                </div>
                {/* report date toggle*/}
                <div className="reports-date-toggle">
                    <label htmlFor="">Report by date range</label>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                    </div>
                </div>
                {/* date range */}
                <div className="reports-date-range row">
                    {/* start date */}
                    <div className="reports-start-date col">
                        <label htmlFor="">Start date</label>
                        <input type="date" />
                    </div>
                    {/* end date */}
                    <div className="reports-end-date col">
                        <label htmlFor="">End date</label>
                        <input type="date" />
                    </div>
                </div>
                {/* button */}
                <div className="reports-buttons mt-3">
                    <button className='clear'>Clear</button>
                    <button className='generate'>Generate Report</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default isAuthenticated(Reports);
