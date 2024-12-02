import { useState, useEffect } from 'react';
import ServiceTile from '../components/ServiceTile';
import ServerApi from '../api/api';

function Services(){
    const [serviceList, setServiceList] = useState([]);

    useEffect(function getAllServices(){
        async function getServices(){
            try{
                const response = await ServerApi.getAllServices();
                setServiceList(response);
            }catch (err){
                console.error("Error fetching services:", err);
            }
        }
        getServices();
    }, []);

    return(
        <div className="Services">
            <h1>Select a Service</h1>
            {serviceList.length > 0 ? (
                
                serviceList.map(service => (
                    <ServiceTile
                        key={service.service_id}
                        id={service.service_id}
                        name={service.service_name}
                        group={service.service_group}
                        description = {service.service_desc}
                        price = {service.service_price}
                        duration = {service.service_duration}
                    />
                ))
            ) : (
                <p>No servies found.</p>
            )}
        </div>
        
    )
}

export default Services;