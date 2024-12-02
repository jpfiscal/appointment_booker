import React, { useState, useEffect, useContext } from "react";
import ServerApi from '../api/api';
import { convertToDate } from '../helpers/helper';
import AppointmentRecord from "./AppointmentRecord";
import '../styles/appointmentList.css';

function AppointmentList({client_id, service_id, provider_id, booking_dt_start, booking_dt_end, status}){
    const [appointmentList, setAppointmentList] = useState([]);
    const start_dt = convertToDate(booking_dt_start);
    const end_dt = convertToDate(booking_dt_end);
    useEffect(function getUpcomingAppointments(){
        async function getAppointments(){
            try{
                const response = await ServerApi.getAppointments(client_id, service_id, provider_id, start_dt, end_dt, status);
                setAppointmentList(response.appointments);
                
            }catch (err){
                console.error("Error fetching appointments: ", err);
            }
        }
        getAppointments();
    }, []);

    const handleCancel = async (apptId) => {
        try{
            await ServerApi.cancelAppointment(apptId);
            setAppointmentList(appointmentList.filter(appt => appt.appointment_id !== apptId))
        }catch (err){
            console.error("Error canceling appointment: ", err);
        }
    };

    const formatDate = (dateStr) =>{
        const date = new Date(dateStr);
        const formattedDate = date.toISOString().slice(0, 10).replace('T', ' ');
        return formattedDate;
    }

    const formatTime = (time) =>{
        const formattedTime = time.slice(0,5);
        return formattedTime;
    }
    return (
        <div className="AppointmentList">
            {appointmentList.length > 0 ? (
                <table className="AppointmentTbl">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Service</th>
                            <th>Provider</th>
                            <th>Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        appointmentList.map(a => (
                            <AppointmentRecord 
                                key={`${a["Client Name"]}_${a["time"]}`}
                                apptId = {a.appointment_id}
                                date = {formatDate(a.date)}
                                time = {formatTime(a.time)}
                                serviceName = {a["Service Name"]}
                                providerName = {a["Provider Name"]}
                                status = {a.status}
                                onCancel={handleCancel}
                            />
                        ))
                    }
                    </tbody>
                    
                </table>
                ): (
                <p>No appointments found.</p>
                )
            }
        </div>
    )
}

export default AppointmentList;