import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogSession = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username")
    const generateSessionID = () => {
        const sessionId = Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem("session_id", sessionId);
        return sessionId;
      };


  useEffect(() => {
    const session_id = sessionStorage.getItem("session_id") || generateSessionID();
    const user_agent = navigator.userAgent;
    const logSession = async () => {
      try {
        // Get the user's IP address
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ip_address = ipResponse.data.ip;

        // Log the session by sending a POST request to your backend
        const response = await axios.post('http://localhost:80/api2/user/save', {
          action: 'logSession',
          session_id,
          user_agent,
          ip_address,
          username
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Handle the response from the server
        console.log('Log Session Response:', response.data.message);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error logging session:', error.response?.data || error.message);
      }
    };

    
    logSession(); // Automatically call logSession when the component mounts
  }, []);

  return null; // No UI elements needed, since it runs automatically
};

export default LogSession;
