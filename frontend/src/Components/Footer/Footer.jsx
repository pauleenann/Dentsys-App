import React from 'react'
import logo from '../../Assets/logo.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
            <div className="">
                <img src={logo} alt="" className='footer-logo' />
            </div>
            <div className="social-link">
                <div className="contacts">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-regular fa-envelope"></i>
                    <i className="fa-solid fa-phone"></i>
                </div>
                <div className="copyright">
                <p className='copyright-p'>&copy; 2024 TOOTHIE CUTIE DENTAL CLINIC</p>
                </div>
            </div>
            
        </footer>
  )
}

export default Footer
