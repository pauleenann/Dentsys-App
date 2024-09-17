import React, {useState, useEffect} from 'react'
import axios from "axios";
import logowhite from  './../../Assets/logowhite.png'
import './Admin.css'
import { Link, useNavigate } from "react-router-dom";
import isAuthenticated from '../Auth';
import Dashboard from '../../Pages/Dashboard';

const Admin = () => {

  const [usernamelogin, setusernamelogin] = useState('');
  const [passwordlogin, setPasswordlogin] = useState('');
  const loginData = { 
    action: 'login', 
    username: '', 
    password: '' 
  };
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/dashboard');
    }
  }, [navigate]);


  const handleLogin = async () => {
    loginData.username = usernamelogin;
    loginData.password = passwordlogin;
    console.info(loginData)
    try {
        const response = await axios.post('http://localhost:80/api2/user/save', loginData);
      const data = response.data;
            if (data.status === 1) {
                localStorage.setItem('username', data.username);
                localStorage.setItem('account_type', data.account_type);
                window.location.href = '/dashboard'; 
            } else {
                console.error(data.message);
            }

    } catch (error) {
        console.error('Login failed:', error.message);
        alert("Invalid Credentials / User does not exist")
    }
  };

  return (
    <div className='admin-container'>
      <div className='admin-header'>
        <div className='admin-login-box'>
            <img src={logowhite} alt="" className='admin-logo'/>
            <h3 className='admin-dentsys'>DENTSYS</h3>
            <form action="">
                <div className="col-12 mb-3">
                <label htmlFor="" className="form-label admin-username" >Username</label>
                <input type="text" className="form-control " name='username' id='username' value={usernamelogin} onChange={(e) => setusernamelogin(e.target.value)} required />
                </div>
                <div className="col-12 mb-3">
                <label htmlFor="" className="form-label admin-pass" >Password</label>
                <input type="password" className="form-control " name='password' id='password' value={passwordlogin} onChange={(e) => setPasswordlogin(e.target.value)} required/>
                </div>
                
            </form>
            <button type="submit" className="btn admin-button d-flex justify-content-center" id="submit" onClick={handleLogin} value="try">Login</button>
        </div>
      </div>
      <div className='admin-footer d-flex justify-content-center align-items-center '>
        <p className='copyright-p'>&copy; 2024 TOOTHIE CUTIE DENTAL CLINIC</p>
      </div>
    </div>
  )
}

export default isAuthenticated(Admin);
