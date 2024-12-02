import React, {useContext} from "react";
import userContext from "./userContext";
import { useNavigate, Link } from "react-router-dom";
import '../styles/vertNav.css'

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
                    <li><Link to="/appointments/history">Appointment History</Link></li>
                    <li><Link to="/accountInfo">Personal Info</Link></li>
                    <li><Link to="/calendarSettings">Google Calendar Settings</Link></li>
                </ul>
                <button onClick={handleBookAppointment}>Book an Appointment</button>
            </div>
        )
    } else if (currentUser && (currentUser.isProvider || currentUser.isAdmin)) {
        return (
            <div className="VertNav">
                <h2>My Account</h2>
                <ul>
                    <li><Link to="/appointments/history">Appointment History</Link></li>
                    <li><Link to="/appointments/manage">Manage Appointments</Link></li>
                    <li><Link to="/availabilities/manage">Manage Availabilities</Link></li>
                    <li><Link to="/services/manage">Manage Services</Link></li>
                    <li><Link to="/accountInfo">Contact Info</Link></li>
                    <li><Link to="/passwordUpdate">Change Password</Link></li>
                </ul>
                <button onClick={handleBookAppointment}>Book an Appointment</button>
            </div>
        )
    } else {
        return(
            <div className="VertNav" style={{width:0}}>
            </div>
        )
    }
    
}

export default VertNav;