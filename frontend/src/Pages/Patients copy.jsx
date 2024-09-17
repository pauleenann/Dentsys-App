import React from 'react'
import AdminPatients from '../Components/AdminPatients/AdminPatients'
import isAuthenticated from '../Components/Auth'

const Patients = () => {
  return (
    <div>
      <AdminPatients></AdminPatients>
    </div>
  )
}

export default isAuthenticated(Patients);
