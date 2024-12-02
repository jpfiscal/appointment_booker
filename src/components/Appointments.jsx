import React, { useContext, useState, useEffect } from "react";
import userContext from "./userContext";
import AppointmentList from "./AppointmentList";
import ServerApi from '../api/api';

function Appointments(){
    const currentUser = useContext(userContext);
    const [currClient, setCurrClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getClient(){
            try{
                const client = await ServerApi.getClient(currentUser.email);
                setCurrClient(client);
            }catch (err){
                console.error("Error fetching client: ", err);
            } finally {
                setLoading(false); // End loading after fetch
            }
        }
        if (currentUser){
            getClient();
        } else {
            setLoading(false); // No need to load if there's no currentUser
        }
        
    }, [currentUser]);

    return (
        <div className="appointments">
            <h2>Appointment History</h2>
            {currClient ? (
                <AppointmentList client_id={currClient.client_id} booking_dt_end={Date.now()} />

            ) : (
                <div>Loading appointments...</div> // Loading message in place of AppointmentList
            )}
        </div>
    );
}

export default Appointments;