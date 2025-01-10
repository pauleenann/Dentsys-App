import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import './AddUserModal.css'

const AddUserModal = ({open,close}) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        account_type: "",
        u_fname: "",
        u_lname: "",
        confirmPassword: "",
      });

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddUser = async () => {
        const { username, password, account_type, u_fname, u_lname, confirmPassword } =
          formData;
    
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
    
        try {
          const response = await axios.post("https://prodbackenddentsys.tuplrc-cla.com/user/save", {
            action: "addUser",
            username,
            password,
            account_type,
            u_fname,
            u_lname,
          });
    
          if (response.data.success) {
            alert("User added successfully!");
            close(); // Close the modal
          } else {
            alert("Error adding user: " + response.data.message);
          }
        } catch (error) {
          console.error("Error adding user:", error.response?.data || error.message);
          alert("Failed to add user. Please try again.");
        }
      };

    if(!open){
        return null
    }
    
  return ReactDom.createPortal(
    <div className='add-user-modal-container'>
        {/* overlay */}
        <div className='add-user-modal-overlay'></div>
        {/* box */}
        <div className="add-user-modal-box">
            {/* header */}
            <div className="add-user-modal-header row">
                <span className='col-7 text-end'>Add User</span>
                {/* close button */}
                <div className='col-5 text-end'>
                    <button className='edit-user-close' onClick={close}>
                        <i class="fa-solid fa-x"></i>
                    </button>   
                </div>
            </div>
            {/* input */}
            <div className="add-user-modal-inputs row">
                {/* first name */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">First Name:</label>
                    <input type="text" name="u_fname"
                        value={formData.u_fname}
                        onChange={handleInputChange}/>
                </div>
                {/* last name */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Last Name:</label>
                    <input type="text" name="u_lname"
                        value={formData.u_lname}
                        onChange={handleInputChange}/>
                </div>
                {/* role */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Role:</label>
                    <select name="account_type" id="" 
                        value={formData.account_type}
                        onChange={handleInputChange}>
                        <option value="">Select Role</option>
                        <option value="dentist">Dentist</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                {/* username */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Username:</label>
                    <input type="text" name="username"
                        value={formData.username}
                        onChange={handleInputChange}/>
                </div>
                {/* password */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Password:</label>
                    <input type="password" name="password"
                        value={formData.password}
                        onChange={handleInputChange}/>
                </div>
                {/* confirm password */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Confirm Password:</label>
                    <input type="password" name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}/>
                </div>
            </div>
            {/* button */}
            <div className='add-user-modal-button-container'>
                <button className='add-user-modal-button' onClick={handleAddUser}>Add user</button>
            </div>
        </div>
      
    </div>,
    document.getElementById('portal')
  )
}

export default AddUserModal
