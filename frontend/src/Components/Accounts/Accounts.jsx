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


const Accounts = () => {
    const [editUser, setEditUser] = useState(false)
    const [removeUser, setRemoveUser] = useState(false)
    const [addUser, setAddUser] = useState(false)

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
        {/* accounts column */}
        <div className="accounts-column row mt-4">
            <div className="col">Name</div>
            <div className="col">User Role</div>
            <div className="col">Actions</div>
        </div>
        {/* accounts */}
        <div className="user-accounts row mt-4">
            <div className="col user-name">
                <i class="fa-regular fa-circle-user"></i>
                <span>Lance Bernal</span>
            </div>
            <div className="col">
                <span>Clinic Staff</span>
            </div>
            <div className="col">
                {/* edit account*/}
                <button className='edit-user-button' onClick={()=>setEditUser(true)}>
                    <i class="fa-solid fa-pen"></i>
                    <span>Edit User</span>
                </button>
                {/* remove user */}
                <button className='remove-user-button' onClick={()=>setRemoveUser(true)}>
                    <i class="fa-solid fa-person-arrow-down-to-line"></i>
                    <span>Set as Inactive</span>
                </button>
            </div>
        </div>
      </div>
      <EditUserModal open={editUser} close={()=>setEditUser(false)}></EditUserModal>
      <SetInactiveModal open={removeUser} close={()=>setRemoveUser(false)}></SetInactiveModal>
      <AddUserModal open={addUser} close={()=>setAddUser(false)}></AddUserModal>
    </div>
  )
}

export default isAuthenticated(Accounts);
