import React, {useState, useEffect} from 'react'
import axios from "axios";
import logowhite from  './../../Assets/logowhite.png'
import './Admin.css'
import { Link, useNavigate } from "react-router-dom";
import isAuthenticated from '../Auth';
import LogSession from '../LogSession';

const Admin = () => {
  const [loginData, setLoginData] = useState({
    action: 'login', 
    username: '', 
    password: '' 
  })
  const [error,setError]=useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Admin mounted')
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/dashboard');
      
    }
  }, [navigate]);
  
  // kapag pinindot ung enter key sa keyboard
  const handleKeyDown = (e)=>{
    if(e.key === 'Enter'){
      console.log('entered')
      handleLogin()
    }
  }

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:80/api2/user/save', loginData);
        console.log(response)
        const data = response.data;
            if (data.status === 1) {
                setIsLoggedIn(true);
                localStorage.setItem('username', data.username);
                localStorage.setItem('account_type', data.account_type);
                
                console.log('Login successful!');
                //navigate('/dashboard');
                
            } else {
              setError("Invalid credentials! Please try again.")
              console.error(data.message);
            }
    } catch (error) {
        console.error('Login failed:', error.message);
        
    }
  };

  // every time na nagbabago ung value sa mga input field, malalagay ung changes sa loginData
  const handleChange = (e)=>{
    const {name, value} = e.target
    setLoginData({...loginData, [name]:value})
  }

  console.log(loginData)

  return (
    <div className='admin-container'>
      <div className='admin-header'>
        <div className='admin-login-box'>
            <img src={logowhite} alt="" className='admin-logo'/>
            <h3 className='admin-dentsys'>DENTSYS</h3>
            <form action="">
                <div className="col-12 mb-3">
                <label htmlFor="" className="form-label admin-username" >Username</label>
                <input type="text" className="form-control " name='username' id='username' onChange={handleChange} onKeyDown={handleKeyDown} required />
                </div>
                <div className="col-12 mb-3">
                <label htmlFor="" className="form-label admin-pass" >Password</label>
                <input type="password" className="form-control " name='password' id='password' onChange={handleChange} onKeyDown={handleKeyDown} required/>
                </div>
                <p className='login-error'>{error}</p>
                
            </form>
            <button type="submit" className="btn admin-button d-flex justify-content-center" id="submit" onClick={handleLogin} value="try">Login</button>
            {isLoggedIn && (
              <LogSession/>
            )}
        </div>
        
      </div>
      <div className='admin-footer d-flex justify-content-center align-items-center '>
        <p className='copyright-p'>&copy; 2024 TOOTHIE CUTIE DENTAL CLINIC</p>
      </div>
    </div>
  )
}

export default isAuthenticated(Admin);
