import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ServerApi from './api/api';
import './appointmentConfirm.css';

function AppointmentConfirm(){
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, availability, service, client_id } = location.state || {};
    

    const availabilityList = [];

    //populate availabilityList
    let i = 1;
    while (availability[`avail ID${i}`]){
        availabilityList.push(availability[`avail ID${i}`]);
        i++;
    }

    //determine whether user has set up a valid google token
    const [hasToken, setHasToken] = useState(false);
    
    useEffect(() => {
        async function getGoogleToken(){
            const googleToken = await ServerApi.getGoogleToken(userId);
            const tokenKeyCount = Object.keys(googleToken).length;
            if (tokenKeyCount > 0 ){
                setHasToken(true);
            }
        }
        getGoogleToken();
    }, []);

    const INITIAL_STATE = {
        clientNote: '',
        saveOnGmail: false
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const {name, value, type, checked } = e.target
        setFormData(formData => ({
            ...formData,
            [name]: type === 'checkbox' ? checked: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            // Book the appointment
            const response = await ServerApi.bookAppointment(
                client_id, 
                service.service_id, 
                availabilityList, 
                formData.clientNote
            );        

            // if user has a token saved against their account ID
            if (hasToken){
                const event = {
                    userId: userId,
                    summary: service.service_name,
                    description: formData.clientNote,
                    start: `${availability.date.split("T")[0]}T${availability["start time"]}`,
                    end: `${availability.date.split("T")[0]}T${availability["end time"]}`
                };
                try{
                    await ServerApi.createGoogleCalendarEvent(event);
                }catch (err){
                    console.error('Error creating Google Calendar Event:', err);
                }
            }
            setFormData(INITIAL_STATE);
            navigate("/");
        }catch(err){
            console.error("Problem occured while trying to book an appointment ", err);
        }
    }

    return(
        <div className="AppointmentConfirm">
            <h2>Confirm your appointment</h2>
            <ul>
                <li><span>Date: </span>{availability.date.split("T")[0]}</li>
                <li><span>Time: </span>{availability["start time"]}</li>
                <li><span>Service: </span>{service.service_name}</li>
                <li><span>Provider: </span>{availability["provider name"]}</li>
            </ul>
            <form className="appointmentConfirmForm" onSubmit={handleSubmit}>
                <label htmlFor="clientNote">Include any additional information you would like your provider to be notified about.</label>
                <textarea
                    id="clientNote"
                    name="clientNote"
                    onChange={handleChange}
                ></textarea>
                <button>Confirm</button>
            </form>
        </div>
    )
}

export default AppointmentConfirm;