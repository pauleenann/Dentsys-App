import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './EditUserModal.css';
import AuditLogger from '../auditLogger';
//import SetInactiveModal from '../SetInactiveModal/SetInactiveModal';

const EditUserModal = ({ open, close, user, onUserUpdated }) => {
    const [removeUser, setRemoveUser] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false); // For discard confirmation
    const [userData, setUserData] = useState([]);
    const [originalData, setOriginalData] = useState([]); // To store initial data for comparison
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // For save button loading state
    const [error, setError] = useState(null);

    const username = localStorage.getItem("username")
 
    const [logAction, setLogAction] = useState(false); // State to trigger AuditLogger
    const [action, setAction] = useState("");
   


    useEffect(() => {
        if (open && user) {
            axios
                .get(`http://localhost:80/api2/${user}/?action=getUserData`)
                .then((response) => {
                    setUserData(response.data);
                    setOriginalData(response.data); // Save initial data
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [open, user]);

    const navigate = useNavigate();

    const handleSave = () => {
        if (!userData) return;
        setAction("Save");
      
        setLoading(true);
        axios
            .put(`http://localhost:80/api2/${user}/?action=updateUserData`, userData)
            .then((response) => {
                console.log('User data updated successfully:', response.data);
                setLogAction(true);
                if (onUserUpdated) onUserUpdated();
                
                close(); // Close the modal after saving
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
                setError('Failed to update user data');
            })
            .finally(() => {
                setLoading(false);
            });
            //setTimeout(() => setLogAction(false), 1000);
    };

    const newStatus = userData.status === 'active' ? 'inactive' : 'active';
    const origStatus = userData.status;

    const handleStatusToggle = () => {
        
        axios
            .put(`http://localhost:80/api2/${user}/?action=updateStatus`, { status: newStatus })
            .then((response) => {
                console.log(`User status updated to ${newStatus}:`, response.data);
                setUserData({ ...userData, status: newStatus }); // Update local state
            })
            .catch((error) => {
                console.error('Error updating user status:', error);
                setError('Failed to update user status.');
            });
    };

    const handleClose = () => {
        // Check if data has changed
        if (JSON.stringify(userData) !== JSON.stringify(originalData)) {
            setShowDiscardModal(true);
            //handleStatusToggle();
        } else {
            close(); // Close without confirmation if no changes
        }
    };

    const handleDiscardChanges = () => {
        setShowDiscardModal(false); // Hide discard modal
        if(originalData.status =! origStatus){
            handleStatusToggle();
        }
        setUserData(originalData); // Reset changes
        
        close(); // Close main modal
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    if (!open) {
        return null;
    }

    return ReactDom.createPortal(
        <div className='edit-user-modal-container'>
            {/* overlay */}
            <div className='edit-user-modal-overlay'></div>
            {/* box */}
            <div className="edit-user-modal-box">
                {/* header */}
                <div className="edit-user-modal-header row">
                    <span className='col-8 text-end'>Edit User Information</span>
                    {/* close button */}
                    <div className='col-4 text-end'>
                        <button className='edit-user-close' onClick={handleClose}>
                            <i className="fa-solid fa-x"></i>
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
                            <option value="" disabled>Select Role</option>
                            <option value="dentist">Dentist</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
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
                        <button className="btn btn-light text-muted"
                            type="button"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                {/* buttons */}
                <div className='edit-user-modal-button-container'>
                    <button
                        className={`remove-user-button ${userData.status === 'active' ? 'inactive-button' : 'active-button'}`}
                        onClick={handleStatusToggle}
                    >
                        <i className={`fa-solid ${userData.status === 'active' ? 'fa-person-arrow-down-to-line' : 'fa-person-arrow-up-from-line'}`}></i>
                        <span>{userData.status === 'active' ? 'Set as Inactive' : 'Set as Active'}</span>
                    </button>
                    {error && <div className="error-message">{error}</div>}
                    <button
                        className='edit-user-modal-button'
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {logAction && <AuditLogger action={action} user={username}/>}
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Discard Confirmation Modal */}
            {showDiscardModal && (
                <div className="discard-changes-modal-container">
                    <div className="discard-changes-modal-overlay"></div>
                    <div className="discard-changes-modal-box">
                        <p>Are you sure you want to discard changes?</p>
                        <div className="discard-changes-modal-buttons">
                        <button onClick={() => {setShowDiscardModal(false); }} className="no-button">No</button>
                            <button onClick={handleDiscardChanges} className="yes-button">Yes</button>
                            
                        </div>
                    </div>
                </div>
                
            )}
            
        </div>,
        document.getElementById('portal')
        
    );
};

export default EditUserModal;
