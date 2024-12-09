import React, { useState, useEffect } from 'react'
import axios from "axios";
import './SetInactiveModal.css'
import ReactDom from 'react-dom'

const SetInactiveModal = ({open, close, user, onStatusUpdated }) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false); // To handle loading state
    const [error, setError] = useState(null); // To handle errors

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
    
    const handleSetInactive = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`http://localhost:80/api2/${user}/?action=setInactive`, {
                status: 'inactive', // Assumes the backend expects a 'status' field
            });

            console.log('User status updated successfully:', response.data);

            if (onStatusUpdated) {
                onStatusUpdated(); // Callback to notify parent component of the update
            }

            close(); // Close the modal after successful update
        } catch (error) {
            console.error('Error updating user status:', error);
            setError('Failed to update user status.');
        } finally {
            setLoading(false);
        }
    };
    
    if(!open){
        return null
    }

    console.log(user)
    console.log(userData)

  return ReactDom.createPortal(
    <div className='set-inactive-modal-container'>   
        {/* overlay */}
        <div className='set-inactive-modal-overlay'></div>
        {/* box */}
        <div className="set-inactive-modal-box">
            {/* header */}
            <div className="set-inactive-modal-header row">
                <span className='col-8 text-end'>Set as Inactive</span>
                {/* close button */}
                <div className='col-4 text-end'>
                    <button className='set-inactive-close' onClick={close}>
                        <i class="fa-solid fa-x"></i>
                    </button>   
                </div>
            </div>
            {/* content */}
            <div className='set-inactive-modal-content'>
                <p className='m-0'>Are you sure want to set<br/> <span>{userData.u_fname} {userData.u_lname}</span> as inactive?</p>
            </div>
            {/* button */}
            <div className="set-inactive-modal-button">
                <button className='no-set-inactive' onClick={close} disabled={loading}>No</button>
                <button className='yes-set-inactive' onClick={handleSetInactive} disabled={loading}>{loading ? 'Processing...' : 'Yes'}</button>
            </div>
        </div>
        
    </div>,
    document.getElementById('portal')
  )
}

export default SetInactiveModal
