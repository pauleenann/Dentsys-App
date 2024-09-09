import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import AppointmentForm from '../Components/AppoinmentForm/AppointmentForm'
import Footer from '../Components/Footer/Footer'
import isAuthenticated from '../Components/Auth'

const Appointment = () => {
  return (
    <div className=''>
      <NavBar></NavBar>
      <AppointmentForm></AppointmentForm>
      <Footer></Footer>
    </div>
  )
}

export default isAuthenticated(Appointment);
