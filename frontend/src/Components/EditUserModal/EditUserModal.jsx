import React from 'react'
import ReactDom from 'react-dom'
import './EditUserModal.css'

const EditUserModal = ({open,close}) => {

    if(!open){
        return null
    }else{
        console.log('edit user modal opened')
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
                    <input type="text" />
                </div>
                {/* last name */}
                <div className='edit-user-modal-input col-4'>
                    <label htmlFor="">Last Name:</label>
                    <input type="text" />
                </div>
                {/* role */}
                <div className='edit-user-modal-input col-4'>
                    <label htmlFor="">Role:</label>
                    <select name="" id="">
                        <option value="">Select Role</option>
                        <option value="dentist">Dentist</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                {/* username */}
                <div className='edit-user-modal-input col-6'>
                    <label htmlFor="">Username:</label>
                    <input type="text" />
                </div>
                {/* password */}
                <div className='edit-user-modal-input col-6'>
                    <label htmlFor="">Password:</label>
                    <input type="password" />
                </div>
            </div>
            {/* button */}
            <div className='edit-user-modal-button-container'>
                <button className='edit-user-modal-button'>Save</button>
            </div>
            
        </div>
      
    </div>,
    document.getElementById('portal')
  )
}

export default EditUserModal
