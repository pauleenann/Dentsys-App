import React from 'react'
import AdminAppointment from '../Components/AdminAppointment/AdminAppointment'
import isAuthenticated from '../Components/Auth'

const AdminAppointmentList = () => {
  return (
    <div>
      <AdminAppointment></AdminAppointment>
    </div>
  )
}

export default isAuthenticated(AdminAppointmentList);
