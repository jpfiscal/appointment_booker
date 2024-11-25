import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { convertToDate } from "./helpers/helper";
import userContext from "./userContext";
import './availabilityBlock.css';

function AvailabilityBlock ({availability, service, client_id}) {
    const currentUser = useContext(userContext);
    const navigate = useNavigate();
    const userId = currentUser.accountId;
    const handleClick = () =>{
        navigate("/appointment/confirm", {
            state: {userId, availability, service, client_id}
        }); //navigate to appointment confirmation component;
    }
    // Parse start and end times to get the hours and minutes
    const [startHour, startMinute] = availability["start time"].split(':').map(Number);
    const [endHour, endMinute] = availability["end time"].split(':').map(Number);
    

    // Calculate duration in minutes
    const durationInMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);

    // Set height based on duration (e.g., 1 minute = 1px)
    const height = `${durationInMinutes}px`;

    // Calculate top offset based on start time and that 8am is the earliest slot possible
    const startInMinutes = (startHour-8) * 60 + startMinute;
    const top = `${startInMinutes}px`;

    // Determine if the block is in the past
    const now = convertToDate(Date.now());
    const isPast = availability.date < now;

    return(
        <div 
            className={`timeBlock${isPast ? 'Past' : ''}`}
            style={{
                height: height,
                top: top
            }}
            onClick={handleClick}>
            <p>{availability["start time"]} - {availability["end time"]}</p>
        </div>
    )
}

export default AvailabilityBlock;