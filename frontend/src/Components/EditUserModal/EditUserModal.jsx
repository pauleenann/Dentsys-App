import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import axios from "axios";
import './EditUserModal.css'
import SetInactiveModal from '../SetInactiveModal/SetInactiveModal';


const EditUserModal = ({open,close, user}) => {
    const [removeUser, setRemoveUser] = useState(false)
    const [userData, setUserData] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // For save button loading state
    const [error, setError] = useState(null);
    useEffect(() => {
        if (open && user) {
            console.log(user)
            axios
                .get(`http://localhost:80/api2/${user}/?action=getUserData`)
                .then((response) => {
                    //console.log(response.data);
                    setUserData(response.data);
                    
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [open, user]);

    const handleSave = () => {
        if (!userData) return;

        setLoading(true);
        axios
            .put(`http://localhost:80/api2/${user}/?action=updateUserData`, userData)
            .then((response) => {
                console.log('User data updated successfully:', response.data);
                //alert('User data updated successfully');
                close(); // Close the modal after saving
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
                setError('Failed to update user data');
            })
            .finally(() => {
                setLoading(false);
            });
    };


    if (!open) {
        return null;
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    console.log(userData);
  return ReactDom.createPortal(
    <div className='edit-user-modal-container'>
        {/* overlay */}
        <div className='edit-user-modal-overlay'></div>
        {/* box */}
        <div className="edit-user-modal-box">
            {/* header */}
            <div className="edit-user-modal-header row">
                <span className='col-8 '><b> {userData.u_fname} {userData.u_lname}</b> Information</span>
                {/* close button */}
                <div className='col-4 text-end'>
                    <button className='edit-user-close' onClick={close}>
                        <i class="fa-solid fa-x"></i>
                    </button>   
                </div>
            </div>
            {/* input */}
            <div className="edit-user-modal-inputs row">
                {/* first name */}
                <div className='edit-user-modal-input col-4'>
                    <label htmlFor="">First Name:</label>
                    <input type="text" 
                        id="u_fname"
                        value={userData?.u_fname || ''}
                        onChange={(e) =>
                        setUserData({ ...userData, u_fname: e.target.value })
                    } />
                </div>
                {/* last name */}
                <div className='edit-user-modal-input col-4'>
                    <label htmlFor="">Last Name:</label>
                    <input type="text" 
                        id="u_lname"
                        value={userData?.u_lname || ''}
                        onChange={(e) =>
                        setUserData({ ...userData, u_lname: e.target.value })
                    }/>
                </div>
                {/* role */}
                <div className='edit-user-modal-input col-4'>
                    <label htmlFor="">Role:</label>
                    <select id="role"
                            value={userData?.account_type || ''}
                            onChange={(e) =>
                            setUserData({ ...userData, account_type: e.target.value })
                            }>
                        
                        <option value="dentist">Dentist</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                {/* username */}
                <div className='edit-user-modal-input col-6'>
                    <label htmlFor="">Username:</label>
                    <input type="text" 
                           id="username"
                           value={userData?.username || ''}
                           onChange={(e) =>
                           setUserData({ ...userData, username: e.target.value })
                            }/>
                </div>
                {/* password */}
                <div className='edit-user-modal-input col-6'>
                    <label htmlFor="">Password:</label>
                    <input type={showPassword ? "text" : "password"} 
                            id="password"
                            value={userData?.password || ''}
                            onChange={(e) =>
                                setUserData({ ...userData, password: e.target.value })
                            } />
                    <button class="btn btn-light text-muted"
                        type="button"
                        onClick={togglePasswordVisibility}
                        
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            


            {/* button */}
            <div className='edit-user-modal-button-container'>
                <button className='remove-user-button' onClick={()=>setRemoveUser(true)}>
                    <i class="fa-solid fa-person-arrow-down-to-line"></i>
                    <span>Set as Inactive</span>
                </button>
                {error && <div className="error-message">{error}</div>}
                <button className='edit-user-modal-button' onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </div>
            
        </div>
        <SetInactiveModal open={removeUser} close={()=>setRemoveUser(false)}></SetInactiveModal>
    </div>,
    document.getElementById('portal')
  )
}

export default EditUserModal
