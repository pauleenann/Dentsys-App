import './NavBar.css'
import logowhite from './../../Assets/logowhite.png'
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ onAboutUsClick,  onServicesClick}) => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-main">
            <div className="container-fluid navigation-box">
              <Link to='/'><a className="navbar-brand" href="#"><img src={logowhite} className='logo' alt="" /></a>
              </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ms-auto menu text-end">
                    <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="" onClick={onAboutUsClick}>About Us</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={onServicesClick}>Services</a>
                    </li>
                    
                </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default NavBar
