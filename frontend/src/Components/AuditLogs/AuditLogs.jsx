import React, { useEffect, useState } from 'react'
import './AuditLogs.css'
import axios from 'axios';
import isAuthenticated from '../Auth';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';

const AuditLogs = () => {
    const [audits, setAudits] = useState([]);

    useEffect(() => {
       // Fetch appointments when the component is mounted
       getAudit();
    
       //Listen for the 'updateData' event from the server
       
    });

    const getAudit = async () => {
        try {
          const response = await axios.get("http://localhost:80/api2/?action=getAudit");
          setAudits(response.data); // Update state with fetched data
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <div className='audit-container'>
       <AdminNavbar />
       <div className="content">
            <AdminInfo/>
            {/* audit header */}
            <div className="audit-header">
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
                    {audits.length>0?audits.map((entry, index) => (
                    <tr>
                        <td>{entry.user}</td>
                        <td>{entry.action}</td>
                        <td>{entry.timestamp}</td>
                    </tr>
                    )):''}
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
