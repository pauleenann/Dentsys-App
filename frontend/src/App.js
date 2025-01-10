import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appointment from './Pages/Appointment';
import NavBar from './Components/NavBar/NavBar'
import AppointmentSubmitted from "./Components/AppointmentSubmitted/AppointmentSubmitted";
import ServicesPage from "./Components/ServicesPage/ServicesPage";
import Admin from "./Components/Admin/Admin";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar";
import AdminAppointmentList from "./Pages/AdminAppointmentList";
import AdminPatients from "./Components/AdminPatients/AdminPatients";
import AddNewPatient from "./Pages/AddNewPatient";
import Reschedule from "./Components/Reschedule/Reschedule";
import RescheduleDone from "./Components/RescheduleDone/RescheduleDone";
import AppointmentDetails from "./Components/AppointmentDetails/AppointmentDetails";
import AppointmentConfirmed from "./Components/AppoinmentConfirmed/AppointmentConfirmed";
import CancelAppointment from "./Components/CancelAppointment/CancelAppointment";
import AppointmentSubmittedPage from "./Pages/AppointmentSubmittedPage";
import ViewPatientInfo from "./Components/ViewPatientInfo/ViewPatientInfo";
import EditPatientInfo from "./Components/EditPatientInfo/EditPatientInfo";
import DentalHistory from "./Components/DentalHistory/DentalHistory";
import ServicesOffered from "./Pages/ServicesOffered";
import AddAppointment from "./Components/AddAppointment/AddAppointment";
import Invoice from "./Components/Invoice/Invoice";
import InvoiceDetails from "./Components/InvoiceDetails/InvoiceDetails";
import UpdateInvoice from "./Components/UpdateInvoice/UpdateInvoice";

import Protected from "./Components/Protected";
import Home from "./Pages/Home";
import AppointmentCancelledConfirm from "./Components/AppointmentCancelledConfirm/AppointmentCancelledConfirm";
import Accounts from "./Components/Accounts/Accounts";
import AuditLogs from "./Components/AuditLogs/AuditLogs";
import Reports from "./Components/Reports/Reports";
import AddDentalHistory from "./Components/AddDentalHistory/AddDentalHistory";
import AdminDash from "./Components/AdminDash/AdminDash";


const App = () => {
  return (
    <div>
     
      {/* <AdminNavbar></AdminNavbar> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route></Route>
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment-request-submitted" element={<AppointmentSubmittedPage/>} />
        <Route path="/services-page" element={<ServicesOffered/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Protected allowedRoles={['admin', 'staff']}><AdminDash /></Protected>} />
        <Route path="/appointment-list" element={<Protected allowedRoles={['admin','staff']}><AdminAppointmentList/></Protected>} />
        <Route path="/patient-list" element={<Protected allowedRoles={['admin','dentist','staff']}><AdminPatients/></Protected>} />
        <Route path="/add-new-patient" element={<Protected allowedRoles={['admin', 'dentist','staff']}><AddNewPatient/></Protected>} />
        <Route path="/reschedule" element={<Protected allowedRoles={['admin','staff']}><Reschedule></Reschedule></Protected>} />
        <Route path="/rescheduled" element={<Protected allowedRoles={['admin','staff']}><RescheduleDone></RescheduleDone></Protected>} />
        <Route path="/appointment-details" element={<Protected allowedRoles={['admin','staff']}><AppointmentDetails/></Protected>} />
        <Route path="/appointment-confirmed" element={<Protected allowedRoles={['admin','staff']}><AppointmentConfirmed/></Protected>} />
        <Route path="/cancel-appointment" element={<Protected allowedRoles={['admin','staff']}><CancelAppointment/></Protected>} />
        <Route path="/view-patient-info/:id" element={<Protected allowedRoles={['admin', 'dentist','staff']}><ViewPatientInfo/></Protected>} />
        <Route path="/edit-patient-info/:id" element={<Protected allowedRoles={['admin', 'dentist','staff']}><EditPatientInfo/></Protected>} />
        <Route path="/add-service/:id" element={<Protected allowedRoles={['admin','dentist','staff']}><AddDentalHistory/></Protected>} />
        <Route path="/dental-history/:id" element={<Protected allowedRoles={['admin','dentist','staff']}><DentalHistory/></Protected>} />
        <Route path="/add-appointment" element={<Protected allowedRoles={['admin','staff']}><AddAppointment/></Protected>} />
        <Route path="/invoice-list" element={<Protected allowedRoles={['admin','staff']}><Invoice/></Protected>} />
        <Route path="/accounts" element={<Protected allowedRoles={['admin']}><Accounts/></Protected>} />
        <Route path="/audit" element={<Protected allowedRoles={['admin']}><AuditLogs/></Protected>} />
        <Route path="/reports" element={<Protected allowedRoles={['admin','staff']}><Reports/></Protected>} />
        <Route path="/invoice-details/:id" element={<Protected allowedRoles={['admin','staff']}><InvoiceDetails/></Protected>} />
        <Route path="/update-invoice/:id" element={<Protected allowedRoles={['admin','staff']}><UpdateInvoice/></Protected>} />     
        <Route path="/appointment-cancelled/:id" element={<AppointmentCancelledConfirm/>} />      
      </Routes>
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
