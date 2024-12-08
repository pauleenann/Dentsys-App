import React from 'react'
import './AuditLogs.css'
import isAuthenticated from '../Auth';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';

const AuditLogs = () => {
  return (
    <div className='audit-container'>
       <AdminNavbar />
       <div className="content">
            <AdminInfo/>
            {/* audit header */}
            <div className="audit-header mt-5">
                <h1>Audit Logs</h1>
            </div>
            {/* audit filter */}
            <div className="audit-filter-dropdown">
                {/* filter by user */}
                <select name="" id="">
                    {/* change according users sa database*/}
                    <option value="">User</option>
                </select>
                {/* filter by activity */}
                <select name="" id="">
                    {/* change according sa actions na ilalagay mo sa audit trail */}
                    <option value="">Accept Appointment</option>
                </select>
            </div>
            {/* audit date filter */}
            <div className="audit-filter-date">
                <input type="date" />
                <span>to</span>
                <input type="date" />
                <button className='audit-filter-reset'>Reset</button>
            </div>
            {/* audit info */}
            <table className='table'>
                <thead className='audit-thead'>
                    <tr>
                        <th>User</th>
                        <th>Action</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody className='audit-tbody'>
                    <tr>
                        <td>lance.bernal</td>
                        <td>Processed payment</td>
                        <td>05-20-2024  9:30 AM</td>
                    </tr>
                </tbody>
            </table>
            {/* pagination */}
            <div className="audit-pagination">
                <p>Page <span>1</span> of <span>1</span></p>
                <div>
                    <button className='audit-prev' disabled>Prev</button>
                    <button className='audit-next'>Next</button>
                </div>
            </div>
       </div>
    </div>
  )
}

export default isAuthenticated(AuditLogs);
