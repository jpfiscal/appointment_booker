import React, {useContext, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import AvailabilityView from "./AvailabilityView";
import '../styles/Availabilities.css';
import ServerApi from '../api/api';

function Availabilities(){
    const { id } = useParams(); // Retrieves the service ID from the URL
    const [currService, setCurrService] = useState(null);
    const [currClient, setCurrClient] = useState(null);
    const [isLoading, setLoading] = useState({ service: true, client: true });
    const currentUser = useContext(userContext);

    //get client details of the currentUser
    useEffect(() => {
        async function getClient(){
            try{
                const client = await ServerApi.getClient(currentUser.email);
                setCurrClient(client);
            }catch (err){
                console.error("Error fetching client: ", err);
            } finally {
                setLoading(prevState => ({ ...prevState, client: false })); // End loading after fetch
            }
        }
        if (currentUser){
            getClient();
        } else {
            setLoading(prevState => ({ ...prevState, client: false })); // No need to load if there's no currentUser
        }
        
    }, [currentUser]);

    //get service details of selected service
    useEffect(() => {
        async function getServiceDetails(id){
            try{
                const response = await ServerApi.getService(id);
                setCurrService(response.result);
                
            }catch (err){
                console.error("Error fetching service details: ", err);
            }finally{
                setLoading(prevState => ({ ...prevState, service: false }));
            }
        }
        if (id) getServiceDetails(id);
    },[id]);
    
    return (
        <div className="AvailabilityContainer">
            
            {currService && currClient? (
                <>
                    <h2>Select an available time for {currService.service_name} appointments</h2>
                    <AvailabilityView service={currService} client_id={currClient.client_id}/>
                </>
            ) : currService && !currClient ? (
                <p>Could not load client information. Please try again.</p>
            ) : (
                <p>Loading Availabilities...</p>
            )}
        </div>
    );
}

export default Availabilities