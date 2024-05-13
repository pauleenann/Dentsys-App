import React from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import './AdminPatients.css'

const AdminPatients = () => {
  return (
    <div className='wrapper'>
        <AdminNavbar></AdminNavbar>
        <div id="content">
            <AdminInfo></AdminInfo>
            <div className="patient-header">
                  <h1>Patients</h1>
                  <button className='btn patient-button-color'><i class="fa-regular fa-square-plus button-text text-light"></i><span className='text-light button-add'> Add a New Patient</span></button>
                </div>

                {/* patient search, filter, and sort */}
                <div className="search row">
                    <div className="col-8">
                      <input type="text" name="" id="" placeholder='Search' className='search-bar'/>  
                    </div>
                    

                     {/*dropdown for filter  */}
                    <div class="dropdown col-2">
                    <button class="btn dropdown-toggle filter-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       Filter
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </div>

                    {/* dropdown for order by */}
                    <div class="dropdown col-2">
                    <button class="btn orderby-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       Order by
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </div>


                </div>
                {/* patients list */}
                <div className="row patient-record">
                      <div className="col patient-name">
                        Giolliana Pladez
                      </div>
                      <div className="col patient-service">
                        Teeth Cleaning
                      </div>
                      <div className="col patient-data">
                        10/21/23
                      </div>
                      <div className="col">
                        <button className='btn button-view'>View</button>
                        <button className='btn button-edit-container'><i class="fa-solid fa-pencil button-edit"></i></button>
                      </div>
                    </div>


        </div>
      
    </div>
  )
}

export default AdminPatients
