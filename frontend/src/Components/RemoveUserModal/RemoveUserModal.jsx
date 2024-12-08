import React from 'react'
import './RemoveUserModal.css'
import ReactDom from 'react-dom'

const RemoveUserModal = ({open, close}) => {
    if(!open){
        return null
    }else{
        console.log('remove user modal opened')
    }

  return ReactDom.createPortal(
    <div className='remove-user-modal-container'>   
        {/* overlay */}
        <div className='remove-user-modal-overlay'></div>
        {/* box */}
        <div className="remove-user-modal-box">
            {/* header */}
            <div className="remove-user-modal-header row">
                <span className='col-8 text-end'>Remove User</span>
                {/* close button */}
                <div className='col-4 text-end'>
                    <button className='edit-user-close' onClick={close}>
                        <i class="fa-solid fa-x"></i>
                    </button>   
                </div>
            </div>
            {/* content */}
            <div className='remove-user-modal-content'>
                <p className='m-0'>Are you sure want to remove<br/> <span>Lance Bernal</span>?</p>
            </div>
            {/* button */}
            <div className="remove-user-modal-button">
                <button className='no-remove-user'>No</button>
                <button className='yes-remove-user'>Yes</button>
            </div>
        </div>
        
    </div>,
    document.getElementById('portal')
  )
}

export default RemoveUserModal
