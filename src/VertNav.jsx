import React, {useContext} from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import './vertNav.css'

function VertNav(){
    const currentUser = useContext(userContext);
    const navigate = useNavigate();

    const handleBookAppointment = () => {
        navigate("/services"); // Navigate to "/services" on button click
    };

    if (currentUser && !(currentUser.isProvider || currentUser.isAdmin)){
        return (
            <div className="VertNav">
                <h2>My Account</h2>
                <ul>
                    <li><a href="/appointments/history">Appointment History</a></li>
                    <li><a href="/accountInfo">Personal Info</a></li>
                    <li><a href="/calendarSettings">Google Calendar Settings</a></li>
                </ul>
                <button onClick={handleBookAppointment}>Book an Appointment</button>
            </div>
        )
    } else if (currentUser && (currentUser.isProvider || currentUser.isAdmin)) {
        return (
            <div className="VertNav">
                <h2>My Account</h2>
                <ul>
                    <li><a href="/appointments/history">Appointment History</a></li>
                    <li><a href="/appointments/manage">Manage Appointments</a></li>
                    <li><a href="/availabilities/manage">Manage Availabilities</a></li>
                    <li><a href="/services/manage">Manage Services</a></li>
                    <li><a href="/accountInfo">Contact Info</a></li>
                    <li><a href="/passwordUpdate">Change Password</a></li>
                </ul>
                <button onClick={handleBookAppointment}>Book an Appointment</button>
            </div>
        )
    } else {
        return(
            <div className="VertNav">
            </div>
        )
    }
    
}

export default VertNav;