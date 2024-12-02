import React, { useState, useContext, useEffect } from "react";
import userContext from "../components/userContext";
import ServerApi from '../api/api';
import '../styles/CalendarSettings.css';
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

function CalendarSettings(){
    const currentUser = useContext(userContext);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        async function getGoogleToken(){
            const googleToken = await ServerApi.getGoogleToken(currentUser.accountId);
            const tokenKeyCount = Object.keys(googleToken).length
            if (tokenKeyCount > 0 ){
                setHasToken(true);
            }
        }
        getGoogleToken();
    }, []);

    const handleClick = async (e) => {
        const handleGoogleAuth = () => {
            window.location.href = `${BASE_URL}/auth/google?userId=${currentUser.accountId}`;
        };
        handleGoogleAuth();
    }
    if(hasToken){
        return(
            <div className="calendarSettingsContainer">
                <h2>Your account is already linked to Google Calendars</h2>
            </div>
        )
    }else{
        return(
            <div className="calendarSettingsContainer">
                <h2>Link Your Account to Google Calendar</h2>
                <p>Link your account with Google to sync your appointments to your Google Calendar.</p>
                <button onClick={handleClick}>Link to Google</button>
            </div>
        )
    }
}

export default CalendarSettings;