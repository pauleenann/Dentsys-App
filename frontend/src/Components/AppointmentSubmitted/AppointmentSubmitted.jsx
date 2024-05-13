import { Link, useLocation } from 'react-router-dom';
import './AppointmentSubmitted.css'


const AppointmentSubmitted = () => {
    const location = useLocation();
    const formData = location.state;

  return (
    <div className='appointment-submitted container '>
      <div className="appointment-submitted-header ">
        <h1 className='m-0'>Appointment Request Submitted</h1>
        <i class="fa-regular fa-circle-check check-icon"></i>
      </div>
      <div className="appointment-request-receipt">
        <div className="back-home d-flex justify-content-end align-items-center">
            <Link to='/' className='back-text px-3'>Go back to Home</Link>
            <Link to='/'><i class="fa-solid fa-chevron-right chevron"></i></Link>
            
        </div>
        <p className='hello'>Hello, <span className='submitted-client-name'>{formData.fname} {formData.mname} {formData.lname} {formData.ename}</span></p>
        <p className='thankyou-text'><br/>Thank you for choosing Toothie Cutie for your dental care needs!<br/><br/>Your request for an appointment has been received.<br/><br/>We'll be reaching out to you shortly using the contact information provided:</p>
        <div className="client-container container">
                <div className="row">
                    <div className="col-4 client-container-email text-end">
                        Email: 
                    </div>
                    <div className="col-8 client-container-email">{formData.email}</div>
                </div>
                <div className="row">
                    <div className="col-4 client-container-phone text-end">
                        Phone no.:
                    </div>
                    <div className="col-8 client-container-phone">{formData.phone}</div>
                </div>
            </div>
        <p className='request-reminders '><br/>Please stay tuned for further updates, as we'll be confirming your appointment details with you soon. </p>
      </div>
    </div>
  )
}

export default AppointmentSubmitted
