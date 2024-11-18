import React, { useContext, useEffect, useState } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import AppointmentList from "./AppointmentList";
import ServerApi from './api/api';


function Home() {
    const navigate = useNavigate();
    const currentUser = useContext(userContext);
    const [currClient, setCurrClient] = useState(null);
    const [loading, setLoading] = useState(true);

    const goToLogin = () => {navigate("/login")};
    const goToSignup = () => {navigate("/signup")};

    useEffect(() => {
        async function getClient(){
            try{
                const client = await ServerApi.getClient(currentUser.email);
                setCurrClient(client);
                console.log(`currClient: ${currClient}`);
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

    if(!currentUser){
        return (
            <div className="loggedOutHome">
                <h1>Marveleyes Beauty Bar</h1>
                <h3>Permanent Make Up Experts</h3>
                <div className="loginSignupBtns">
                    <button onClick={goToLogin}>Log in</button>
                    <button onClick={goToSignup}>Sign Up</button>
                </div>
            </div>
        )
    }else{
        return (
            <div className="loggedInHome">
            <h1>Marveleyes Beauty Bar</h1>
            <h3>Experts in Permanent Make Up</h3>
            <h2>Upcoming Appointments</h2>
            {currClient ? (
                <AppointmentList key={currClient.client_id} client_id={currClient.client_id} booking_dt_start={Date.now()} />

            ) : (
                <div>Loading appointments...</div> // Loading message in place of AppointmentList
            )}
        </div>
        )
    }
    
}

export default Home;