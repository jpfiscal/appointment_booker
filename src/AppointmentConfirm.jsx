import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ServerApi from './api/api';
import './appointmentConfirm.css';

function AppointmentConfirm(){
    const navigate = useNavigate();
    const location = useLocation();
    const { availability, service, client_id } = location.state || {};
    const availabilityList = []
    //populate availabilityList
    let i = 1;
    while (availability[`avail ID${i}`]){
        availabilityList.push(availability[`avail ID${i}`]);
        i++;
    }
    console.log(`Availabilities: ${availabilityList}`);

    const INITIAL_STATE = {
        clientNote: '',
        saveOnGmail: false
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const {name, value} = e.target;
        
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await ServerApi.bookAppointment(client_id, service.service_id, availabilityList, formData.clientNote);
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
                <div className="checkBoxContainer">
                    <label htmlFor="saveOnGmail">Create an event on Google Calendar</label>
                    <input 
                        id="saveOnGmail"
                        name="saveOnGmail"
                        type="checkbox"
                    />   
                </div>
                <button>Confirm</button>
            </form>
        </div>
    )
}

export default AppointmentConfirm;