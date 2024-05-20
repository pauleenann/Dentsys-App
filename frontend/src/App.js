import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage'
import Appointment from './Pages/Appointment';
import NavBar from './Components/NavBar/NavBar'
import Footer from "./Components/Footer/Footer";
import AppointmentSubmitted from "./Components/AppointmentSubmitted/AppointmentSubmitted";
import ServicesPage from "./Components/ServicesPage/ServicesPage";
import Admin from "./Components/Admin/Admin";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar";
import Dashboard from "./Pages/Dashboard";
import AdminAppointmentList from "./Pages/AdminAppointmentList";
import AdminPatients from "./Components/AdminPatients/AdminPatients";
import AddNewPatient from "./Pages/AddNewPatient";
import Reschedule from "./Components/Reschedule/Reschedule";
import RescheduleDone from "./Components/RescheduleDone/RescheduleDone";
import AppointmentDetails from "./Components/AppointmentDetails/AppointmentDetails";
import AppointmentConfirmed from "./Components/AppoinmentConfirmed/AppointmentConfirmed";
import CancelAppointment from "./Components/CancelAppointment/CancelAppointment";
import AppointmentSubmittedPage from "./Pages/AppointmentSubmittedPage";

const App = () => {
  return (
    <div>
     
      {/* <AdminNavbar></AdminNavbar> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route></Route>
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment-request-submitted" element={<AppointmentSubmittedPage/>} />
        <Route path="/services-page" element={<ServicesPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment-list" element={<AdminAppointmentList/>} />
        <Route path="/patient-list" element={<AdminPatients/>} />
        <Route path="/add-new-patient" element={<AddNewPatient/>} />
        <Route path="/reschedule" element={<Reschedule></Reschedule>} />
        <Route path="/rescheduled" element={<RescheduleDone></RescheduleDone>} />
        <Route path="/appointment-details" element={<AppointmentDetails/>} />
        <Route path="/appointment-confirmed" element={<AppointmentConfirmed/>} />
        <Route path="/cancel-appointment" element={<CancelAppointment/>} />

        
        
      </Routes>
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
