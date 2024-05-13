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

const App = () => {
  return (
    <div>
     
      {/* <AdminNavbar></AdminNavbar> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route></Route>
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment-request-submitted" element={<AppointmentSubmitted />} />
        <Route path="/services-page" element={<ServicesPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
