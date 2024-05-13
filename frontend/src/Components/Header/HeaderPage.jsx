import './HeaderPage.css'
import { Link, useNavigate } from "react-router-dom";

const HeaderPage = () => {
  return (
    <div className='headerpage d-flex '>
      <div className="headerpage-container container">
      <div className="card headerpage-card">
          <div className="card-body p-0">
            <div className="cardheader ">
              <h5 className='cardheader-h5'>Toothie Cutie</h5>
              <p className='cardheader-p'>Verdant Clinic</p>
            </div>
            <p className="card-text headercard-text">Your path to <br/>dental wellness starts here</p>
            <Link to="/appointment" className="btn appointment-btn">Book an appointment</Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default HeaderPage
