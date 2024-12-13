import React, { useEffect, useState } from "react";
import axios from "axios";

const AuditLogger = ({ action, user }) => {
  const username = localStorage.getItem("username")
  const generateSessionID = () => {
      const sessionId = Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("session_id", sessionId);
      return sessionId;
    };
  const dateandtime = new Date().toLocaleString();
  // Function to fetch the IP address
  /* const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip); // Set IP address in state
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  }; */

  // Function to log the action
  const logAction = async () => {
    if (!action || !user) return;

    const session_id = (sessionStorage.getItem("session_id") || generateSessionID());
    const ip = ((await axios.get('https://api.ipify.org?format=json')).data.ip);
    console.log(username)
     console.log(action);
     console.log(ip);
     console.log(session_id);
     console.log(dateandtime);
    /* try {
      await axios.post("http://localhost/AuditLogger.php", {
        action: action,
        user: user,
        ip: ip,
      });
    } catch (error) {
      console.error("Error logging action:", error);
    } */
  };

 /*  useEffect(() => {
    fetchIpAddress(); // Fetch IP address on mount
  }, []);
 */
  useEffect(() => {
     logAction(); // Log action once IP is available
     console.log("audit2")
    console.log(user)
    }, [ action, user]);

  return null; // No UI
};

export default AuditLogger;
