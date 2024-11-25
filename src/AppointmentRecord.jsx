import React from "react";
import './appointmentRecord.css';

function AppointmentRecord({apptId, date, time, serviceName, providerName, status, onCancel}){
    async function cancelAppointment(){
        onCancel(apptId);
    };

    return(
        <tr>
            <td>{date}</td>
            <td>{time}</td>
            <td>{serviceName}</td>
            <td>{providerName}</td>
            <td>{status}</td>
            <td><i className="cancelAppt" onClick={cancelAppointment}>&#10060;</i></td>
        </tr>
    )
}

export default AppointmentRecord;