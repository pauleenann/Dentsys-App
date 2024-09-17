import React from 'react'
import AddPatientInfo from '../Components/AddPatientInfo/AddPatientInfo'
import isAuthenticated from '../Components/Auth'

const AddNewPatient = () => {
  return (
    <div>
      <AddPatientInfo/>
    </div>
  )
}

export default isAuthenticated(AddNewPatient);
