import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'

import './AdminPatients.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server


const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [keyOfSelectedAppointment, setKeyOfSelectedAppointment] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);

  const LIMIT = 5;

  /* const fetchPatients = async (letter) => {
    setSelectedLetter(letter);
    try {
      const response = await axios.get(`http://localhost:80/api2/?action=getPatientsByLetter&letter=${letter}`);
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setPatients([]);
    }
  }; */

  const fetchPatientsByLetter = async (letter, page = 1) => {
    const offset = (page - 1) * LIMIT;
    setSelectedLetter(letter);

    try {
      const response = await axios.get(
        `http://localhost:80/api2/?action=getPatientsByLetter&letter=${letter}&limit=${LIMIT}&offset=${offset}`
      );
      setPatients(response.data.patients);
      setTotalPatients(response.data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching patient data by letter:", error);
    }
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  useEffect(() => {
    getPatients();

    //Listen for the 'updateData' event from the server
    socket.on('updatedData', ()=>{
      getPatients();
      console.log('updated data');
    }); // Fetch updated appointments when event is emitted

   // Cleanup the event listener when the component unmounts
   return () => {
     socket.off('updatedData');
   };
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value.toLowerCase());
}

/* const handleReset = () => {
  fetchPatients("", 1); // Reset to the first page with no letter filter
  getPatients();
}; */

console.log(search)
console.log(selectedLetter)

  /* function getPatients() {
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
  } */
      const getPatients = async (page = 1) => {
        const offset = (page - 1) * LIMIT;
    
        try {
          const response = await axios.get(
            `http://localhost:80/api2/?action=getPatients&limit=${LIMIT}&offset=${offset}`
          );
          console.log(response.data)
          setPatients(response.data.patients);
          setTotalPatients(response.data.total);
          setCurrentPage(page);
        } catch (error) {
          console.error("Error fetching patient data:", error);
          setPatients([]);
        }
      };

      const handleNextPage = () => {
        if (currentPage * LIMIT < totalPatients) {
          if (selectedLetter) {
            fetchPatientsByLetter(selectedLetter, currentPage + 1);
          } else {
            getPatients(currentPage + 1);
          }
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          if (selectedLetter) {
            fetchPatientsByLetter(selectedLetter, currentPage - 1);
          } else {
            getPatients(currentPage - 1);
          }
        }
      };
    
      const handleReset = () => {
        setSelectedLetter("");
        getPatients(1);
      };

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

                <div className="button-group">
                  {letters.map((letter) => (
                    <button
                      key={letter}
                      className={`btn btn-alphabet ${letter === selectedLetter ? "btn-selected" : ""}`}
                      onClick={() => fetchPatientsByLetter(letter)}
                    >
                      {letter}
                    </button>
                    
                  ))}
                  <button className="btn reset-button" onClick={handleReset}>
                    Reset
                  </button>
                </div>
                
                {/* Patients list */}

              {patients ? patients.map((patient, index) => {
                <div className="list">
                  {patients.length > 0 ? (
                    patients.map((name, index) => (
                      <div className="list-item" key={index}>
                        {name}
                        
                      </div>
                    ))
                  ) : (
                    <div className="list-item">
                      {selectedLetter ? `No patients found for "${selectedLetter}"` : "Select a letter to view patients"}
                    </div>
                  )}
                </div>
           
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
                  ) 
                }
                 //return null;
              }) : <p className='text-center mt-5'>No patient record found</p>}

              {/* Pagination Buttons */}
              
              <div className="pagination-buttons">
                  <button
                    className="btn"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {Math.ceil(totalPatients / LIMIT)}
                  </span>
                  <button
                    className="btn"
                    onClick={handleNextPage}
                    disabled={currentPage * LIMIT >= totalPatients}
                  >
                    Next
                  </button>
                </div>
              </div>
      
    </div>
    
  )
}

export default AdminPatients