import React, { useState, useEffect } from 'react';
import './AdminInfo.css'

const AdminInfo = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    const getDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[currentDateTime.getDay()];
    };

    const getFormattedDate = () => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
        return currentDateTime.toLocaleDateString(undefined, options);
    };

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }

  return (
    <div>
      <nav className="navbar admin-info">
                    <div className="admin-info-clock">
                        {currentTime.toLocaleTimeString()}
                    </div>
                    <div>|</div>
                    <div className="admin-info-day">
                        {getDayName()}
                    </div>
                    <div>|</div>
                    <div className="admin-info-date">
                        {getFormattedDate()}
                    </div>
                    <div className="admin-info-user">
                    <div class="dropdown">
                        <button class="btn dropdown-toggle admin-info-user-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <p className='p-0 m-0 admin-hello'>Hello,  <span className='admin-info-name'>Giolliana</span></p>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="/admin" onClick={logout}>Log out</a></li>
                        </ul>
                        </div>
                    </div>
                </nav>
    </div>
  )
}

export default AdminInfo
