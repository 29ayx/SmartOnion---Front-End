import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SessionMaster from '../SessionManager';
const WelcomeUser = () => {

    const [profileName, setProfileName] = useState([]);
    const [error, setError] = useState([]);
    useEffect(() => {
        // Set email from cookies or SessionMaster
        const userEmail = Cookies.get('profileName') || SessionMaster.get('profileName');
        if (userEmail) {
            setProfileName(userEmail);
        } else {
            setError('No email provided.');

        }
    }, []);

    const getTimeOfDayGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const greeting = getTimeOfDayGreeting(); // Get the current time-based greeting

    return (
      
            <div className="card overflow-hidden invoice-card position-unset">
                <div className="card-header bg-gradient3 border-0">
                    <div className="d-flex">
                        <span className="icon bg-card-loan me-3">
                         
                        </span>
                        <div className="invoices">
                            <h4 className="text-white invoice-num">{greeting}, <span className='fs-26 '>{profileName}</span></h4>
                            <span className="text-white fs-14">Welcome to your dashboard</span>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default WelcomeUser;
