import React, { useState, useContext, useEffect } from "react";
import userContext from "./userContext";
import ServerApi from './api/api';

function CalendarSettings(){
    const currentUser = useContext(userContext);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        async function getGoogleToken(){
            const googleToken = await ServerApi.getGoogleToken(currentUser.accountId);
            const tokenKeyCount = Object.keys(googleToken).length
            console.log(`hasToken: ${hasToken}`);
            console.log(`GOOGLE TOKENS: ${tokenKeyCount}`);
            if (tokenKeyCount > 0 ){
                setHasToken(true);
            }
        }
        getGoogleToken();
    }, []);

    const handleClick = async (e) => {
        const handleGoogleAuth = () => {
            window.location.href = `http://localhost:3001/auth/google?userId=${currentUser.accountId}`;
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