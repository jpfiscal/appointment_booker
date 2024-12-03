import React ,{useEffect, useState}from "react";
import AvailabilityBlock from "./AvailabilityBlock";
import { convertToDate } from "../helpers/helper";
import '../styles/availabilityDay.css';
import ServerApi from '../api/api';


function AvailabilityDay({date, service, client_id}){
    //get all availabilities for service id for the date assigned to this component
    const [availabilities, setAvailabilities] = useState([]);
    useEffect(() => {
        async function getAvailabilities(service_id, date){
            try{
                
                const response = await ServerApi.getAvailabilitiesByService(service_id, date);
                setAvailabilities(response);
            }catch (err){
                console.error("Error fetching Appointment: ", err);
            }
        }
        getAvailabilities(service.service_id, date);
        
    },[]);
    
    return (
    <div className="AvailabilityDay" key={`${service.service_id}_${date}`}>
        <h4>{date}</h4>
        <div className="AvailabilityDayContainer">
            {
                (availabilities.availabilities && availabilities.availabilities.length) ? (
                    availabilities.availabilities.map(availability => (
                        <AvailabilityBlock
                            key={`${convertToDate(availability.date)}_${availability["avail ID1"]}`} 
                            availability={availability} 
                            service={service} 
                            client_id={client_id}
                        />
                    ))
                ):(
                    <p>No Availabilities</p>
                )
                
            }
        </div>
    </div>)
}

export default AvailabilityDay;