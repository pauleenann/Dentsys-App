import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';
import './Accounts.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import isAuthenticated from '../Auth';
import EditUserModal from '../EditUserModal/EditUserModal';
import RemoveUserModal from '../SetInactiveModal/SetInactiveModal';
import AddUserModal from '../AddUserModal/AddUserModal';
import SetInactiveModal from '../SetInactiveModal/SetInactiveModal';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Accounts = () => {
    const [editUser, setEditUser] = useState(false)
    const [removeUser, setRemoveUser] = useState(false)
    const [addUser, setAddUser] = useState(false)
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [search, setSearch] = useState('');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [selectedLetter, setSelectedLetter] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const LIMIT = 5;

  useEffect(() => {
    getUsers();

    //Listen for the 'updateData' event from the server
    socket.on('updatedData', ()=>{
      getUsers();
      console.log('updated data');
    }); // Fetch updated appointments when event is emitted

   // Cleanup the event listener when the component unmounts
   return () => {
     socket.off('updatedData');
   };
  }, []);

  const fetchUsersByLetter = async (letter, page = 1) => {
    const offset = (page - 1) * LIMIT;
    setSelectedLetter(letter);
    try {
      const response = await axios.get(`http://localhost:80/api2/?action=getUsersByLetter&letter=${letter}&limit=${LIMIT}&offset=${offset}`);
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching patient data by letter:", error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value.toLowerCase());
  }

  const getUsers = async (page = 1) => {
    const offset = (page - 1) * LIMIT;

    try {
      const response = await axios.get(
        `http://localhost:80/api2/?action=getUsers&limit=${LIMIT}&offset=${offset}`
      );
      console.log(response.data)
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUsers([]);
    }
  };

  const handleNextPage = () => {
    if (currentPage * LIMIT < totalUsers) {
      if (selectedLetter) {
        fetchUsersByLetter(selectedLetter, currentPage + 1);
      } else {
        getUsers(currentPage + 1);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      if (selectedLetter) {
        fetchUsersByLetter(selectedLetter, currentPage - 1);
      } else {
        getUsers(currentPage - 1);
      }
    }
  };

  const handleReset = () => {
    setSelectedLetter("");
    getUsers(1);
  };

  const handleUserUpdated = () => {
    getUsers(); // Refresh user data
};

  return (
    <div className="accounts-container">
      <AdminNavbar />
      <div className="content">
        <AdminInfo />
        {/* accounts header */}
        <div className="accounts-header mt-5">
            <h1>Accounts</h1>
            {/* add account button */}
            <button className='btn add-account' onClick={()=>setAddUser(true)}>
                <i class="fa-regular fa-square-plus button-text text-light"></i>
                <span className='text-light button-add'> Add account</span>
            </button>
        </div>

        <div className="search row">
                    <div className="col-12">
                      <input type="text" name="search" id="" placeholder='Search' className='search-bar' value={search} onChange={handleChange}/>  
                    </div>
        </div>

        <div className="button-group">
                  {letters.map((letter) => (
                    <button
                      key={letter}
                      className={`btn btn-alphabet ${letter === selectedLetter ? "btn-selected" : ""}`}
                      onClick={() => fetchUsersByLetter(letter)}
                    >
                      {letter}
                    </button>
                    
                  ))}
                  <button className="btn reset-button" onClick={handleReset}>
                    Reset
                  </button>
                </div>

        {/* accounts column */}
        <div className="accounts-column row mt-4">
            <div className="col">Name</div>
            <div className="col">User Role</div>
            <div className="col">Actions</div>
        </div>
        {/* accounts */}
        
        {users ? users.map((user, index) => {
                <div className="list">
                  {users.length > 0 ? (
                    users.map((name, index) => (
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
           
                if (user.u_fname.toLowerCase().includes(search) || user.u_lname.toLowerCase().includes(search) || search === '') {
                  return (
                    <div>
                        <div className="user-accounts row mt-4">
                            <div className="col user-name">
                                <i class="fa-regular fa-circle-user "></i>
                                    {user.u_fname} {user.u_lname}
                            </div>
                            <div className="col">
                                <span>{user.account_type}</span>
                            </div>
                            <div className="col">
                                {/* edit account*/}
                                <button className='edit-user-button' onClick={()=>{ setSelectedUser(user.id); setEditUser(true);}}>
                                    <i class="fa-solid fa-pen"></i>
                                    <span>Edit User</span>
                                </button>
                                {/* remove user */}
                                {/* <button className='remove-user-button' onClick={()=>setRemoveUser(true)}>
                                    <i class="fa-solid fa-person-arrow-down-to-line"></i>
                                    <span>Set as Inactive</span>
                                </button> */}
                            </div>
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
                    Page {currentPage} of {Math.ceil(totalUsers / LIMIT)}
                  </span>
                  <button
                    className="btn"
                    onClick={handleNextPage}
                    disabled={currentPage * LIMIT >= totalUsers}
                  >
                    Next
                  </button>
            </div>
             
        
      </div>
      <EditUserModal open={editUser} close={()=>setEditUser(false)} user={selectedUser} onUserUpdated={handleUserUpdated}></EditUserModal>
      <SetInactiveModal open={removeUser} close={()=>setRemoveUser(false)}></SetInactiveModal>
      <AddUserModal open={addUser} close={()=>setAddUser(false)}></AddUserModal>
    </div>
  )
}

export default isAuthenticated(Accounts);
