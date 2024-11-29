import React ,{useEffect, useState}from "react";
import AvailabilityBlock from "./AvailabilityBlock";
import './availabilityDay.css';
import ServerApi from './api/api';


function AvailabilityDay({date, service, client_id}){
    //get all availabilities for service id for the date assigned to this component
    const [availabilities, setAvailabilities] = useState([]);
    useEffect(() => {
        async function getAvailabilities(service_id, date){
            try{
                
                //console.log(`INPUT DAT (AvailabilityDay): ${date}`);
                const response = await ServerApi.getAvailabilitiesByService(service_id, date);
                setAvailabilities(response);
            }catch (err){
                console.error("Error fetching Appointment: ", err);
            }
        }
        // console.log(`SERVICE ID: ${JSON.stringify(service.service_id)}`);
        // console.log(`DATE: ${date}`);
        getAvailabilities(service.service_id, date);
        
    },[]);
    //console.log(`AVAILABILITIES for serviceID:${service.service_id} and date:${date}: ${JSON.stringify(availabilities)}`);
    return (
    <div className="AvailabilityDay" key={`${service.service_id}_${date}`}>
        <h4>{date}</h4>
        <div className="AvailabilityDayContainer">
            {
                (availabilities.availabilities && availabilities.availabilities.length) ? (
                    availabilities.availabilities.map(availability => (
                        <AvailabilityBlock
                            key={`${availability.date}_${availability["start time"]}`} 
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