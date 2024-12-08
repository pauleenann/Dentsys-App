import React from 'react'
import './SetInactiveModal.css'
import ReactDom from 'react-dom'

const SetInactiveModal = ({open, close}) => {
    if(!open){
        return null
    }else{
        console.log('set inactive modal opened')
    }

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
                <p className='m-0'>Are you sure want to set<br/> <span>Lance Bernal</span> as inactive?</p>
            </div>
            {/* button */}
            <div className="set-inactive-modal-button">
                <button className='no-set-inactive'>No</button>
                <button className='yes-set-inactive'>Yes</button>
            </div>
        </div>
        
    </div>,
    document.getElementById('portal')
  )
}

export default SetInactiveModal
