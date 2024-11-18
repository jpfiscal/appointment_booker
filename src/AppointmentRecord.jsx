import React from "react";
import './appointmentRecord.css';

function AppointmentRecord({date, time, serviceName, providerName}){
    return(
        <tr>
            <td>{date}</td>
            <td>{time}</td>
            <td>{serviceName}</td>
            <td>{providerName}</td>
        </tr>
    )
}

export default AppointmentRecord;