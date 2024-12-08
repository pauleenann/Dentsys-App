import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminInfo from '../AdminInfo/AdminInfo';
import './Accounts.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import isAuthenticated from '../Auth';


const Accounts = () => {
  return (
    <div className="accounts-container">
      <AdminNavbar />
      <div id="content">
        <AdminInfo />
        {/* accounts header */}
        <div className="accounts-header mt-5">
            <h1>Accounts</h1>
            {/* add account button */}
            <button className='btn add-account'>
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
                <button className='edit-user-button'>
                    <i class="fa-solid fa-pen"></i>
                    <span>Edit User</span>
                </button>
                {/* remove user */}
                <button className='remove-user-button'>
                    <i class="fa-solid fa-trash"></i>
                    <span>Remove User</span>
                </button>
            </div>
        </div>

     
       
      </div>
    </div>
  )
}

export default isAuthenticated(Accounts);
