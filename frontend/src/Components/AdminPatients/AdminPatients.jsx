import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import './AdminPatients.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [keyOfSelectedAppointment, setKeyOfSelectedAppointment] = useState(null);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    getPatients();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value.toLowerCase());
}

console.log(search)

  function getPatients() {
    axios.get('http://localhost:80/api2/?action=getPatients')
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setPatients(response.data);
        } else {
          console.error('Data is not an array:', response.data);
          setPatients(response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
        setPatients([]);
      });
  }

  return (
    <div className='wrapper'>
        <AdminNavbar/>
        <div id="content">
            <AdminInfo></AdminInfo>
            <div className="patient-header">
                  <h1>Patients</h1>
                  <Link to='/add-new-patient'>
                  <button className='btn patient-button-color'><i class="fa-regular fa-square-plus button-text text-light"></i><span className='text-light button-add'> Add a New Patient</span></button>
                  </Link>
                </div>

                {/* patient search, filter, and sort */}
                <div className="search row">
                    <div className="col-12">
                      <input type="text" name="search" id="" placeholder='Search' className='search-bar' value={search} onChange={handleChange}/>  
                    </div>
                    {/* <div className="col-1">
                      <button className='btn search-button'>Search</button>
                    </div> */}
                    

                     {/*dropdown for filter  */}
                    {/* <div class="dropdown col-2">
                    <button class="btn dropdown-toggle filter-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       Filter
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </div> */}

                    {/* dropdown for order by */}
                     {/* <div class="dropdown col-2">
                    <button class="btn orderby-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       Order by
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Ascending Order</a></li>
                        <li><a class="dropdown-item" href="#">Descending Order</a></li>
                    </ul>
                    </div> */}


                </div>
                
                {/* Patients list */}
              {patients.length > 0 ? patients.map((patient, index) => {
                if (patient.p_fname.toLowerCase().includes(search) || patient.p_lname.toLowerCase().includes(search) || search === '') {
                  return (
                    <div className="row patient-record" key={index}>
                      <div className="col-8 patient-name">
                        {patient.p_fname} {patient.p_lname}
                      </div>
                      <div className="col patient-service">
                        {/* Teeth Cleaning */}
                      </div>
                      <div className="col patient-data">
                        {/* 10/21/23 */}
                      </div>
                      <div className="col">
                        <Link to={`/view-patient-info/${patient.id}`}>
                          <button className='btn button-view'>View</button>
                        </Link>
                        {/* <Link to={`/edit-patient-info/${patient.id}`}>
                          <button className='btn button-edit-container'>
                            <i className="fa-solid fa-pencil button-edit-pencil"></i>
                          </button>
                        </Link> */}
                      </div>
                    </div>
                  );
                }
                return null;
              }) : <p className='text-center'>No patient record found</p>}
              </div>
      
    </div>
  )
}

export default AdminPatients
