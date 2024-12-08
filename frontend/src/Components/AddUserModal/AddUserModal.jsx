import React from 'react'
import ReactDom from 'react-dom'
import './AddUserModal.css'

const AddUserModal = ({open,close}) => {

    if(!open){
        return null
    }else{
        console.log('edit user modal opened')
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
                    <input type="text" />
                </div>
                {/* last name */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Last Name:</label>
                    <input type="text" />
                </div>
                {/* role */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Role:</label>
                    <select name="" id="">
                        <option value="">Select Role</option>
                        <option value="dentist">Dentist</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                {/* username */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Username:</label>
                    <input type="text" />
                </div>
                {/* password */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Password:</label>
                    <input type="password" />
                </div>
                {/* confirm password */}
                <div className='add-user-modal-input col-4'>
                    <label htmlFor="">Confirm Password:</label>
                    <input type="password" />
                </div>
            </div>
            {/* button */}
            <div className='add-user-modal-button-container'>
                <button className='add-user-modal-button'>Add user</button>
            </div>
        </div>
      
    </div>,
    document.getElementById('portal')
  )
}

export default AddUserModal
