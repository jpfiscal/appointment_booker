import React from "react";
import './appointmentRecord.css';
import AlertDialog from "./AlertDialog";

function AppointmentRecord({apptId, date, time, serviceName, providerName, status, onCancel}){

    return(
        <tr>
            <td>{date}</td>
            <td>{time}</td>
            <td>{serviceName}</td>
            <td>{providerName}</td>
            <td>{status}</td>
            <td>
                <AlertDialog
                    key={apptId} 
                    apptId={apptId}
                    onCancel={onCancel}
                />
            </td>
        </tr>
    )
}

export default AppointmentRecord;