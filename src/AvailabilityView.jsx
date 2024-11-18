import React, {useEffect, useState} from "react";
import AvailabilityDay from "./AvailabilityDay";
import './availabilityView.css';

function AvailabilityView({service, client_id}){
    
    const [refDate, setRefDate] = useState(Date.now());
    let weekDates = getWeekFromDate(refDate);
    function getWeekFromDate(date){
        //console.log(`service in availaibility VIEW: ${JSON.stringify(service)}`);
        const startOfWeek = new Date(date);
        const dayOfWeek = startOfWeek.getDay();

        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

        const week = [];
        for (let i = 0; i < 7; i++){
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            week.push(day.toISOString().split('T')[0]);
        }
        return week;
    }

    function goToNextWeek(){
        const nextWeek = new Date(refDate);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setRefDate(nextWeek);
    }

    function goToPrevWeek(){
        const prevWeek = new Date(refDate);
        prevWeek.setDate(prevWeek.getDate() - 7);
        setRefDate(prevWeek);
    }
    
    //let weekDates = getWeekFromDate(refDate);

    return (
        <div className="availabilityView">
            <div className="toggleBtnContainer">
                <button onClick={goToPrevWeek}>Previous Week</button>
                <button onClick={goToNextWeek}>Next Week</button>
            </div>
            <div className="availabilityDays">
                {
                    weekDates.map(day => (
                        <AvailabilityDay key={`${day}_${service.service_id}`} date={day} service={service} client_id={client_id}/>
                    ))
                }
            </div>
            
        </div>
    )
}

export default AvailabilityView;